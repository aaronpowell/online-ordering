import gql from "graphql-tag"
import * as ApolloReactCommon from "@apollo/react-common"
import * as ApolloReactHooks from "@apollo/react-hooks"
export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: Date
}

export type Address = {
  __typename?: "Address"
  address: Scalars["String"]
  state: Scalars["String"]
  postcode: Scalars["String"]
}

export type MenuItem = {
  __typename?: "MenuItem"
  description: Scalars["String"]
  glutenFree: Scalars["Boolean"]
  id: Scalars["ID"]
  ingredients: Array<Scalars["String"]>
  name: Scalars["String"]
  notes?: Maybe<Scalars["String"]>
  picture?: Maybe<Scalars["String"]>
  price: Scalars["Float"]
  vegetarian: Scalars["Boolean"]
}

export type MenuResult = {
  __typename?: "MenuResult"
  items?: Maybe<Array<MenuItem>>
  page: Scalars["Int"]
  totalPages: Scalars["Int"]
}

export type Order = {
  __typename?: "Order"
  date?: Maybe<Scalars["DateTime"]>
  id: Scalars["ID"]
  items: Array<OrderItem>
  orderer: User
  price: Scalars["Float"]
  state: OrderState
}

export type OrderItem = {
  __typename?: "OrderItem"
  quantity: Scalars["Int"]
  item: MenuItem
}

export enum OrderState {
  Placed = "Placed",
  Preparing = "Preparing",
  Ready = "Ready",
  Complete = "Complete",
}

export type Query = {
  __typename?: "Query"
  menu: MenuResult
  menuItem?: Maybe<MenuItem>
  order?: Maybe<Order>
  orders: Array<Order>
  user?: Maybe<User>
}

export type QueryMenuArgs = {
  page?: Maybe<Scalars["Int"]>
}

export type QueryMenuItemArgs = {
  id: Scalars["ID"]
}

export type QueryOrderArgs = {
  id: Scalars["ID"]
}

export type QueryOrdersArgs = {
  userId: Scalars["ID"]
}

export type QueryUserArgs = {
  id: Scalars["ID"]
}

export type User = {
  __typename?: "User"
  address?: Maybe<Address>
  email: Scalars["String"]
  id: Scalars["ID"]
  name: Scalars["String"]
}

export const OrderFieldsFragmentDoc = gql`
  fragment OrderFields on Order {
    id
    items {
      quantity
      item {
        name
        price
      }
    }
    state
    price
    date
  }
`
export const FindOrdersForUserDocument = gql`
  query findOrdersForUser($userId: ID!) {
    orders(userId: $userId) {
      ...OrderFields
    }
  }
  ${OrderFieldsFragmentDoc}
`

/**
 * __useFindOrdersForUserQuery__
 *
 * To run a query within a React component, call `useFindOrdersForUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOrdersForUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOrdersForUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useFindOrdersForUserQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    FindOrdersForUserQuery,
    FindOrdersForUserQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    FindOrdersForUserQuery,
    FindOrdersForUserQueryVariables
  >(FindOrdersForUserDocument, baseOptions)
}
export function useFindOrdersForUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    FindOrdersForUserQuery,
    FindOrdersForUserQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    FindOrdersForUserQuery,
    FindOrdersForUserQueryVariables
  >(FindOrdersForUserDocument, baseOptions)
}
export type FindOrdersForUserQueryHookResult = ReturnType<
  typeof useFindOrdersForUserQuery
>
export type FindOrdersForUserLazyQueryHookResult = ReturnType<
  typeof useFindOrdersForUserLazyQuery
>
export type FindOrdersForUserQueryResult = ApolloReactCommon.QueryResult<
  FindOrdersForUserQuery,
  FindOrdersForUserQueryVariables
>
export type FindOrdersForUserQueryVariables = {
  userId: Scalars["ID"]
}

export type FindOrdersForUserQuery = { __typename?: "Query" } & {
  orders: Array<{ __typename?: "Order" } & OrderFieldsFragment>
}

export type OrderFieldsFragment = { __typename?: "Order" } & Pick<
  Order,
  "id" | "state" | "price" | "date"
> & {
    items: Array<
      { __typename?: "OrderItem" } & Pick<OrderItem, "quantity"> & {
          item: { __typename?: "MenuItem" } & Pick<MenuItem, "name" | "price">
        }
    >
  }
