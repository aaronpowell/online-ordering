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

export type Mutation = {
  __typename?: "Mutation"
  addItemToOrder?: Maybe<Order>
  createOrder?: Maybe<Order>
}

export type MutationAddItemToOrderArgs = {
  orderId: Scalars["ID"]
  menuItemId: Scalars["ID"]
  quantity: Scalars["Int"]
}

export type MutationCreateOrderArgs = {
  userId?: Maybe<Scalars["ID"]>
  sessionId?: Maybe<Scalars["ID"]>
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
  Ordering = "Ordering",
  Placed = "Placed",
  Preparing = "Preparing",
  Ready = "Ready",
  Complete = "Complete",
}

export type Query = {
  __typename?: "Query"
  menu?: Maybe<Array<MenuItem>>
  menuItem?: Maybe<MenuItem>
  order?: Maybe<Order>
  orders: Array<Order>
  user?: Maybe<User>
}

export type QueryMenuArgs = {
  offset?: Maybe<Scalars["Int"]>
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

export const MenuItemFragmentFragmentDoc = gql`
  fragment MenuItemFragment on MenuItem {
    id
    name
    description
    price
    glutenFree
    vegetarian
    picture
  }
`
export const OrderFieldsFragmentDoc = gql`
  fragment OrderFields on Order {
    id
    items {
      quantity
      item {
        id
        name
        price
      }
    }
    state
    price
    date
  }
`
export const GetMenuItemsDocument = gql`
  query getMenuItems($offset: Int) {
    menu(offset: $offset) {
      ...MenuItemFragment
    }
  }
  ${MenuItemFragmentFragmentDoc}
`

/**
 * __useGetMenuItemsQuery__
 *
 * To run a query within a React component, call `useGetMenuItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMenuItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMenuItemsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetMenuItemsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetMenuItemsQuery,
    GetMenuItemsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetMenuItemsQuery,
    GetMenuItemsQueryVariables
  >(GetMenuItemsDocument, baseOptions)
}
export function useGetMenuItemsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetMenuItemsQuery,
    GetMenuItemsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetMenuItemsQuery,
    GetMenuItemsQueryVariables
  >(GetMenuItemsDocument, baseOptions)
}
export type GetMenuItemsQueryHookResult = ReturnType<
  typeof useGetMenuItemsQuery
>
export type GetMenuItemsLazyQueryHookResult = ReturnType<
  typeof useGetMenuItemsLazyQuery
>
export type GetMenuItemsQueryResult = ApolloReactCommon.QueryResult<
  GetMenuItemsQuery,
  GetMenuItemsQueryVariables
>
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
export const CreateOrderDocument = gql`
  mutation createOrder($userId: ID, $sessionId: ID) {
    createOrder(userId: $userId, sessionId: $sessionId) {
      ...OrderFields
    }
  }
  ${OrderFieldsFragmentDoc}
`
export type CreateOrderMutationFn = ApolloReactCommon.MutationFunction<
  CreateOrderMutation,
  CreateOrderMutationVariables
>

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      sessionId: // value for 'sessionId'
 *   },
 * });
 */
export function useCreateOrderMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateOrderMutation,
    CreateOrderMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateOrderMutation,
    CreateOrderMutationVariables
  >(CreateOrderDocument, baseOptions)
}
export type CreateOrderMutationHookResult = ReturnType<
  typeof useCreateOrderMutation
>
export type CreateOrderMutationResult = ApolloReactCommon.MutationResult<
  CreateOrderMutation
>
export type CreateOrderMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateOrderMutation,
  CreateOrderMutationVariables
>
export type GetMenuItemsQueryVariables = {
  offset?: Maybe<Scalars["Int"]>
}

export type GetMenuItemsQuery = { __typename?: "Query" } & {
  menu?: Maybe<Array<{ __typename?: "MenuItem" } & MenuItemFragmentFragment>>
}

export type MenuItemFragmentFragment = { __typename?: "MenuItem" } & Pick<
  MenuItem,
  | "id"
  | "name"
  | "description"
  | "price"
  | "glutenFree"
  | "vegetarian"
  | "picture"
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
          item: { __typename?: "MenuItem" } & Pick<
            MenuItem,
            "id" | "name" | "price"
          >
        }
    >
  }

export type CreateOrderMutationVariables = {
  userId?: Maybe<Scalars["ID"]>
  sessionId?: Maybe<Scalars["ID"]>
}

export type CreateOrderMutation = { __typename?: "Mutation" } & {
  createOrder?: Maybe<{ __typename?: "Order" } & OrderFieldsFragment>
}
