import { DataStore } from "../DataStore"
import { CosmosClient } from "@azure/cosmos"
import {
  Order,
  MenuItem,
  User,
  OrderState,
} from "../../graphql/generated/types"
import { UserInputError } from "apollo-server-azure-functions"
import { v4 as uuid } from "uuid"
import { CosmosOrder, UserOrderMapping } from "./types"

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
    const query = {
      query: `SELECT *
              FROM o
              WHERE o.partitionKey = @userId`,
      parameters: [
        {
          name: "@userId",
          value: userId,
        },
      ],
    }

    const container = this.getContainer()

    const userOrders = await container.items
      .query<UserOrderMapping>(query)
      .fetchAll()

    const orderResponse = await container.items
      .query<Order>({
        query: `SELECT *
              FROM o
              WHERE o.id IN(@orderIds)`,
        parameters: [
          {
            name: "@orderIds",
            value: userOrders.resources.map((ou) => ou.orderId),
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
              WHERE o.id = @orderId`,
      parameters: [
        {
          name: "@orderId",
          value: orderId,
        },
      ],
    }

    const iter = await this.getContainer().items.query<Order>(query).fetchAll()

    return iter.resources[0]
  }
  async menuItems(offset: number) {
    const query = {
      query: `SELECT *
              FROM m
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
      .items.query<MenuItem>(query)
      .fetchAll()

    return iter.resources
  }
  async menuItem(id: string) {
    const query = {
      query: `SELECT *
              FROM o
              WHERE o.id = @id`,
      parameters: [
        {
          name: "@id",
          value: id,
        },
      ],
    }

    const iter = await this.getContainer()
      .items.query<MenuItem>(query)
      .fetchAll()

    return iter.resources[0]
  }
  async user(userId: string) {
    const query = {
      query: `SELECT *
              FROM o
              WHERE o.id = @userId`,
      parameters: [
        {
          name: "@userId",
          value: userId,
        },
      ],
    }

    const iter = await this.getContainer().items.query<User>(query).fetchAll()

    return iter.resources[0]
  }

  // Mutation
  async createOrder(userId: string, sessionId: string) {
    if (!userId && !sessionId) {
      throw new UserInputError(
        "Please provide either a user or session to create the order for"
      )
    }

    let user: User

    if (userId) {
      user = await this.user(userId)
    } else if (sessionId) {
      const { resource } = await this.client
        .database(this.#databaseName)
        .container(this.#containerName)
        .items.create<User>({
          id: sessionId,
          email: "",
          name: "",
          address: {
            address: "",
            state: "",
            postcode: "",
          },
        })

      user = resource
    }

    if (!user) {
      throw new UserInputError("Unable to create order for the user")
    }

    const { resource } = await this.getContainer().items.create<CosmosOrder>({
      id: uuid(),
      date: new Date(),
      userId: user.id,
      price: 0,
      items: [],
      state: OrderState.Ordering,
    })

    return {
      id: resource.id,
      date: resource.date,
      orderer: user,
      price: resource.price,
      items: [],
      state: resource.state,
    }
  }
  addItemToOrder(
    orderId: string,
    menuItemId: string,
    quantity: number
  ): Promise<Order> {
    throw new Error("Method not implemented.")
  }
}

export const dataStore: DataStore = new CosmosDataStore(
  new CosmosClient(process.env.COSMOS)
)
