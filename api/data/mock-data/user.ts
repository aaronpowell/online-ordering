import { UserModel } from "../types"

const aaron: UserModel = {
  id: "aaronpowell",
  email: "aaron.powell@microsoft.com",
  name: "Aaron Powell",
  address: {
    address: "123 Fake St",
    postcode: "2000",
    state: "NSW",
  },
  partitionKey: "aaronpowell",
  _type: "user",
  phone: "",
}

const jane: UserModel = {
  id: "janedoe",
  email: "jane@email.com",
  name: "Jane Doe",
  address: {
    address: "123 Fake St",
    postcode: "2000",
    state: "NSW",
  },
  partitionKey: "janedoe",
  _type: "user",
  phone: "",
}

const users = [aaron, jane]

export { aaron, jane, users }
