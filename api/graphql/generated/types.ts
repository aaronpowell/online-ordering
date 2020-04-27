import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from "graphql"
export type Maybe<T> = T | null
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X]
} &
  { [P in K]-?: NonNullable<T[P]> }
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
  notes: Maybe<Scalars["String"]>
  picture: Maybe<Scalars["String"]>
  price: Scalars["Float"]
  vegetarian: Scalars["Boolean"]
}

export type Mutation = {
  __typename?: "Mutation"
  addItemToOrder: Maybe<Order>
  createOrder: Maybe<Order>
}

export type MutationAddItemToOrderArgs = {
  orderId: Scalars["ID"]
  menuItemId: Scalars["ID"]
  quantity: Scalars["Int"]
}

export type MutationCreateOrderArgs = {
  userId: Maybe<Scalars["ID"]>
  sessionId: Maybe<Scalars["ID"]>
}

export type Order = {
  __typename?: "Order"
  date: Maybe<Scalars["DateTime"]>
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
  menu: Maybe<Array<MenuItem>>
  menuItem: Maybe<MenuItem>
  order: Maybe<Order>
  orders: Array<Order>
  user: Maybe<User>
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
  address: Maybe<Address>
  email: Scalars["String"]
  id: Scalars["ID"]
  name: Scalars["String"]
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type isTypeOfResolverFn<T = {}> = (
  obj: T,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>
  Int: ResolverTypeWrapper<Scalars["Int"]>
  MenuItem: ResolverTypeWrapper<MenuItem>
  String: ResolverTypeWrapper<Scalars["String"]>
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>
  ID: ResolverTypeWrapper<Scalars["ID"]>
  Float: ResolverTypeWrapper<Scalars["Float"]>
  Order: ResolverTypeWrapper<Order>
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]>
  OrderItem: ResolverTypeWrapper<OrderItem>
  User: ResolverTypeWrapper<User>
  Address: ResolverTypeWrapper<Address>
  OrderState: OrderState
  Mutation: ResolverTypeWrapper<{}>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {}
  Int: Scalars["Int"]
  MenuItem: MenuItem
  String: Scalars["String"]
  Boolean: Scalars["Boolean"]
  ID: Scalars["ID"]
  Float: Scalars["Float"]
  Order: Order
  DateTime: Scalars["DateTime"]
  OrderItem: OrderItem
  User: User
  Address: Address
  OrderState: OrderState
  Mutation: {}
}

export type AddressResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Address"] = ResolversParentTypes["Address"]
> = {
  address: Resolver<ResolversTypes["String"], ParentType, ContextType>
  state: Resolver<ResolversTypes["String"], ParentType, ContextType>
  postcode: Resolver<ResolversTypes["String"], ParentType, ContextType>
  __isTypeOf?: isTypeOfResolverFn<ParentType>
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["DateTime"], any> {
  name: "DateTime"
}

export type MenuItemResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MenuItem"] = ResolversParentTypes["MenuItem"]
> = {
  description: Resolver<ResolversTypes["String"], ParentType, ContextType>
  glutenFree: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  ingredients: Resolver<
    Array<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >
  name: Resolver<ResolversTypes["String"], ParentType, ContextType>
  notes: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  picture: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  price: Resolver<ResolversTypes["Float"], ParentType, ContextType>
  vegetarian: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  __isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  addItemToOrder: Resolver<
    Maybe<ResolversTypes["Order"]>,
    ParentType,
    ContextType,
    RequireFields<
      MutationAddItemToOrderArgs,
      "orderId" | "menuItemId" | "quantity"
    >
  >
  createOrder: Resolver<
    Maybe<ResolversTypes["Order"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateOrderArgs, never>
  >
}

export type OrderResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Order"] = ResolversParentTypes["Order"]
> = {
  date: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  items: Resolver<Array<ResolversTypes["OrderItem"]>, ParentType, ContextType>
  orderer: Resolver<ResolversTypes["User"], ParentType, ContextType>
  price: Resolver<ResolversTypes["Float"], ParentType, ContextType>
  state: Resolver<ResolversTypes["OrderState"], ParentType, ContextType>
  __isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type OrderItemResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["OrderItem"] = ResolversParentTypes["OrderItem"]
> = {
  quantity: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  item: Resolver<ResolversTypes["MenuItem"], ParentType, ContextType>
  __isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  menu: Resolver<
    Maybe<Array<ResolversTypes["MenuItem"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryMenuArgs, "offset">
  >
  menuItem: Resolver<
    Maybe<ResolversTypes["MenuItem"]>,
    ParentType,
    ContextType,
    RequireFields<QueryMenuItemArgs, "id">
  >
  order: Resolver<
    Maybe<ResolversTypes["Order"]>,
    ParentType,
    ContextType,
    RequireFields<QueryOrderArgs, "id">
  >
  orders: Resolver<
    Array<ResolversTypes["Order"]>,
    ParentType,
    ContextType,
    RequireFields<QueryOrdersArgs, "userId">
  >
  user: Resolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, "id">
  >
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  address: Resolver<Maybe<ResolversTypes["Address"]>, ParentType, ContextType>
  email: Resolver<ResolversTypes["String"], ParentType, ContextType>
  id: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  name: Resolver<ResolversTypes["String"], ParentType, ContextType>
  __isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type Resolvers<ContextType = any> = {
  Address: AddressResolvers<ContextType>
  DateTime: GraphQLScalarType
  MenuItem: MenuItemResolvers<ContextType>
  Mutation: MutationResolvers<ContextType>
  Order: OrderResolvers<ContextType>
  OrderItem: OrderItemResolvers<ContextType>
  Query: QueryResolvers<ContextType>
  User: UserResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>

export type GetMenuItemsQueryVariables = {
  offset: Maybe<Scalars["Int"]>
}

export type GetMenuItemsQuery = { __typename?: "Query" } & {
  menu: Maybe<Array<{ __typename?: "MenuItem" } & MenuItemFragmentFragment>>
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
  userId: Maybe<Scalars["ID"]>
  sessionId: Maybe<Scalars["ID"]>
}

export type CreateOrderMutation = { __typename?: "Mutation" } & {
  createOrder: Maybe<{ __typename?: "Order" } & OrderFieldsFragment>
}
