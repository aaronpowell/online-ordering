import { DataStore } from "../DataStore"
import { CosmosClient } from "@azure/cosmos"
import { OrderState } from "../../graphql/generated/types"
import { UserInputError } from "apollo-server-azure-functions"
import { v4 as uuid } from "uuid"
import {
  OrderModel,
  UserModel,
  MenuItemModel,
  OrderUserMapping,
} from "../types"

class CosmosDataStore implements DataStore {
  #databaseName = "OnlineOrdering"
  #containerName = "Ordering"

  private getContainer() {
    return this.client
      .database(this.#databaseName)
      .container(this.#containerName)
  }

  constructor(private client: CosmosClient) {}

  // Query
  async orders(userId: string) {
    const container = this.getContainer()

    const orderUserMapping = await container.items
      .query<{ orderId: string }>({
        query: `SELECT o.orderId
                FROM o
                WHERE o.partitionKey = @userId
                AND   o._type = 'order/user'`,
        parameters: [
          {
            name: "@userId",
            value: userId,
          },
        ],
      })
      .fetchAll()

    console.log(`OrderId's`, orderUserMapping)

    const orderResponse = await container.items
      .query<OrderModel>({
        query: `SELECT *
                FROM o
                WHERE ARRAY_CONTAINS(@orderIds, o.partitionKey)
                AND o._type = 'order'`,
        parameters: [
          {
            name: "@orderIds",
            value: orderUserMapping.resources.map((o) => o.orderId),
          },
        ],
      })
      .fetchAll()

    return orderResponse.resources
  }
  async order(orderId: string) {
    const query = {
      query: `SELECT *
              FROM o
              WHERE o.partitionKey = @orderId`,
      parameters: [
        {
          name: "@orderId",
          value: orderId,
        },
      ],
    }

    const iter = await this.getContainer()
      .items.query<OrderModel>(query)
      .fetchAll()

    return iter.resources[0]
  }
  async menuItems(offset: number) {
    const query = {
      query: `SELECT *
              FROM m
              WHERE m._type = 'menuItem'
              ORDER BY m.id
              OFFSET @offset
              LIMIT @count`,
      parameters: [
        {
          name: "@offset",
          value: offset,
        },
        {
          name: "@count",
          value: 5,
        },
      ],
    }

    const iter = await this.getContainer()
      .items.query<MenuItemModel>(query)
      .fetchAll()

    return iter.resources
  }
  async menuItem(id: string) {
    const query = {
      query: `SELECT *
              FROM o
              WHERE o.partitionKey = @id`,
      parameters: [
        {
          name: "@id",
          value: id,
        },
      ],
    }

    const iter = await this.getContainer()
      .items.query<MenuItemModel>(query)
      .fetchAll()

    return iter.resources[0]
  }

  async menuItemsByIds(ids: string[]) {
    const menuItemsResponse = await this.getContainer()
      .items.query<MenuItemModel>({
        query: `SELECT *
                FROM mi
                WHERE mi._type = 'menuItem'
                AND   ARRAY_CONTAINS(@ids, mi.partitionKey)`,
        parameters: [
          {
            name: "@ids",
            value: ids,
          },
        ],
      })
      .fetchAll()

    return menuItemsResponse.resources
  }

  async user(userId: string) {
    const query = {
      query: `SELECT *
              FROM o
              WHERE o.partitionKey = @userId
              AND o._type = 'user'`,
      parameters: [
        {
          name: "@userId",
          value: userId,
        },
      ],
    }

    const iter = await this.getContainer()
      .items.query<UserModel>(query)
      .fetchAll()

    return iter.resources[0]
  }

  // Mutation
  async createOrder(userId: string, sessionId: string) {
    if (!userId && !sessionId) {
      throw new UserInputError(
        "Please provide either a user or session to create the order for"
      )
    }

    let user: UserModel

    if (userId) {
      user = await this.user(userId)
    } else if (sessionId) {
      const { resource } = await this.client
        .database(this.#databaseName)
        .container(this.#containerName)
        .items.create<UserModel>({
          id: sessionId,
          email: "",
          name: "",
          address: {
            address: "",
            state: "",
            postcode: "",
          },
          partitionKey: sessionId,
          _type: "user",
        })

      user = resource
    }

    if (!user) {
      throw new UserInputError("Unable to create order for the user")
    }

    const orderId = uuid()
    const { resource } = await this.getContainer().items.create<OrderModel>({
      id: orderId,
      date: new Date(),
      userId: user.id,
      price: 0,
      items: [],
      state: OrderState.Ordering,
      _type: "order",
      partitionKey: orderId,
    })

    await this.getContainer().items.create<OrderUserMapping>({
      id: uuid(),
      _type: "order/user",
      partitionKey: user.id,
      orderId: orderId,
    })

    return resource
  }
  async addItemToOrder(
    orderId: string,
    menuItemId: string,
    quantity: number
  ): Promise<OrderModel> {
    const order = await this.order(orderId)

    if (!order) {
      throw new UserInputError("Order doesn't exist in system")
    }

    const menuItem = await this.menuItem(menuItemId)

    if (!menuItem) {
      throw new UserInputError("Item not on the menu")
    }

    order.items.push({
      menuItemId,
      menuItemName: menuItem.name,
      price: menuItem.price,
      quantity,
    })
    order.price = order.items.reduce(
      (price, item) => price + item.price * quantity,
      0
    )

    const response = await this.getContainer()
      .item(order.id, order.partitionKey)
      .replace(order)

    return response.resource
  }
}

export const dataStore: DataStore = new CosmosDataStore(
  new CosmosClient(process.env.COSMOS)
)
