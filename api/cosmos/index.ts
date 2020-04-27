import { DataStore } from "../DataStore"
import { CosmosClient } from "@azure/cosmos"
import { Order, MenuItem, User, OrderState } from "../graphql/generated/types"
import { UserInputError } from "apollo-server-azure-functions"
import { v4 as uuid } from "uuid"
import { CosmosOrder } from "./types"

class CosmosDataStore implements DataStore {
  #databaseName = "OnlineOrdering"
  #containerNames = {
    menuItem: "MenuItem",
    order: "Order",
    user: "User",
  }

  constructor(private client: CosmosClient) {}

  // Query
  async orders(userId: string): Promise<Order[]> {
    const query = {
      query: `SELECT *
              FROM o
              WHERE o.userId = @userId`,
      parameters: [
        {
          name: "@userId",
          value: userId,
        },
      ],
    }

    const iter = await this.client
      .database(this.#databaseName)
      .container(this.#containerNames.order)
      .items.query<Order>(query)
      .fetchAll()

    return iter.resources
  }
  async order(orderId: string): Promise<Order> {
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

    const iter = await this.client
      .database(this.#databaseName)
      .container(this.#containerNames.order)
      .items.query<Order>(query)
      .fetchAll()

    return iter.resources[0]
  }
  async menuItems(offset: number): Promise<MenuItem[]> {
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

    const iter = await this.client
      .database(this.#databaseName)
      .container(this.#containerNames.menuItem)
      .items.query<MenuItem>(query)
      .fetchAll()

    return iter.resources
  }
  async menuItem(id: string): Promise<MenuItem> {
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

    const iter = await this.client
      .database(this.#databaseName)
      .container(this.#containerNames.menuItem)
      .items.query<MenuItem>(query)
      .fetchAll()

    return iter.resources[0]
  }
  async user(userId: string): Promise<User> {
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

    const iter = await this.client
      .database(this.#databaseName)
      .container(this.#containerNames.user)
      .items.query<User>(query)
      .fetchAll()

    return iter.resources[0]
  }

  // Mutation
  async createOrder(userId: string, sessionId: string): Promise<Order> {
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
        .container(this.#containerNames.user)
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

    const { resource } = await this.client
      .database(this.#databaseName)
      .container(this.#containerNames.order)
      .items.create<CosmosOrder>({
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
