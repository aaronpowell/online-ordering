import { User } from "../graphql/generated/types"

const aaron: User = {
  id: "aaronpowell",
  email: "aaron.powell@microsoft.com",
  name: "Aaron Powell",
  address: {
    address: "123 Fake St",
    postcode: "2000",
    state: "NSW",
  },
}

const jane: User = {
  id: "janedoe",
  email: "jane@email.com",
  name: "Jane Doe",
  address: {
    address: "123 Fake St",
    postcode: "2000",
    state: "NSW",
  },
}

const users = [aaron, jane]

export { aaron, jane, users }
