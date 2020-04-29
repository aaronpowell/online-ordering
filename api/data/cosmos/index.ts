import { DataStore } from "../DataStore"
import { CosmosClient } from "@azure/cosmos"
import { MenuItem, User, OrderState } from "../../graphql/generated/types"
import { UserInputError } from "apollo-server-azure-functions"
import { v4 as uuid } from "uuid"
import { OrderModel, UserOrderMapping } from "../types"

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
    console.log(`Getting orders for ${userId}`)

    const orderResponse = await this.getContainer()
      .items.query<OrderModel>({
        query: `SELECT *
                FROM o
                WHERE o.partitionKey = @userId
                AND o._type = 'order'`,
        parameters: [
          {
            name: "@userId",
            value: userId,
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

    const iter = await this.getContainer()
      .items.query<OrderModel>(query)
      .fetchAll()

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

    const { resource } = await this.getContainer().items.create<OrderModel>({
      id: uuid(),
      date: new Date(),
      userId: user.id,
      price: 0,
      items: [],
      state: OrderState.Ordering,
    })

    return resource
  }
  addItemToOrder(
    orderId: string,
    menuItemId: string,
    quantity: number
  ): Promise<OrderModel> {
    throw new Error("Method not implemented.")
  }
}

export const dataStore: DataStore = new CosmosDataStore(
  new CosmosClient(process.env.COSMOS)
)
