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
  id: Scalars["ID"]
  name: Scalars["String"]
  description: Scalars["String"]
  price: Scalars["Float"]
  glutenFree: Scalars["Boolean"]
  vegetarian: Scalars["Boolean"]
  notes?: Maybe<Scalars["String"]>
  ingredients: Array<Scalars["String"]>
  picture?: Maybe<Scalars["String"]>
}

export type MenuResult = {
  __typename?: "MenuResult"
  items?: Maybe<Array<MenuItem>>
  page: Scalars["Int"]
  totalPages: Scalars["Int"]
}

export type Order = {
  __typename?: "Order"
  id: Scalars["ID"]
  items: Array<OrderItem>
  state: OrderState
  price: Scalars["Float"]
  date?: Maybe<Scalars["DateTime"]>
  orderer: User
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
  findOrder?: Maybe<Order>
  findOrdersForUser: Array<Order>
}

export type QueryMenuArgs = {
  page?: Maybe<Scalars["Int"]>
}

export type QueryMenuItemArgs = {
  id?: Maybe<Scalars["ID"]>
}

export type QueryFindOrderArgs = {
  id?: Maybe<Scalars["ID"]>
}

export type QueryFindOrdersForUserArgs = {
  userId?: Maybe<Scalars["ID"]>
}

export type User = {
  __typename?: "User"
  id: Scalars["ID"]
  email: Scalars["String"]
  name: Scalars["String"]
  address?: Maybe<Address>
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
  MenuResult: ResolverTypeWrapper<MenuResult>
  MenuItem: ResolverTypeWrapper<MenuItem>
  ID: ResolverTypeWrapper<Scalars["ID"]>
  String: ResolverTypeWrapper<Scalars["String"]>
  Float: ResolverTypeWrapper<Scalars["Float"]>
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>
  Order: ResolverTypeWrapper<Order>
  OrderItem: ResolverTypeWrapper<OrderItem>
  OrderState: OrderState
  DateTime: ResolverTypeWrapper<Scalars["DateTime"]>
  User: ResolverTypeWrapper<User>
  Address: ResolverTypeWrapper<Address>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {}
  Int: Scalars["Int"]
  MenuResult: MenuResult
  MenuItem: MenuItem
  ID: Scalars["ID"]
  String: Scalars["String"]
  Float: Scalars["Float"]
  Boolean: Scalars["Boolean"]
  Order: Order
  OrderItem: OrderItem
  OrderState: OrderState
  DateTime: Scalars["DateTime"]
  User: User
  Address: Address
}

export type AddressResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Address"] = ResolversParentTypes["Address"]
> = {
  address?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  state?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  postcode?: Resolver<ResolversTypes["String"], ParentType, ContextType>
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
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  price?: Resolver<ResolversTypes["Float"], ParentType, ContextType>
  glutenFree?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  vegetarian?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>
  notes?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  ingredients?: Resolver<
    Array<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >
  picture?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  __isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type MenuResultResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MenuResult"] = ResolversParentTypes["MenuResult"]
> = {
  items?: Resolver<
    Maybe<Array<ResolversTypes["MenuItem"]>>,
    ParentType,
    ContextType
  >
  page?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  totalPages?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  __isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type OrderResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Order"] = ResolversParentTypes["Order"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  items?: Resolver<Array<ResolversTypes["OrderItem"]>, ParentType, ContextType>
  state?: Resolver<ResolversTypes["OrderState"], ParentType, ContextType>
  price?: Resolver<ResolversTypes["Float"], ParentType, ContextType>
  date?: Resolver<Maybe<ResolversTypes["DateTime"]>, ParentType, ContextType>
  orderer?: Resolver<ResolversTypes["User"], ParentType, ContextType>
  __isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type OrderItemResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["OrderItem"] = ResolversParentTypes["OrderItem"]
> = {
  quantity?: Resolver<ResolversTypes["Int"], ParentType, ContextType>
  item?: Resolver<ResolversTypes["MenuItem"], ParentType, ContextType>
  __isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  menu?: Resolver<
    ResolversTypes["MenuResult"],
    ParentType,
    ContextType,
    RequireFields<QueryMenuArgs, "page">
  >
  menuItem?: Resolver<
    Maybe<ResolversTypes["MenuItem"]>,
    ParentType,
    ContextType,
    RequireFields<QueryMenuItemArgs, never>
  >
  findOrder?: Resolver<
    Maybe<ResolversTypes["Order"]>,
    ParentType,
    ContextType,
    RequireFields<QueryFindOrderArgs, never>
  >
  findOrdersForUser?: Resolver<
    Array<ResolversTypes["Order"]>,
    ParentType,
    ContextType,
    RequireFields<QueryFindOrdersForUserArgs, never>
  >
}

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  address?: Resolver<Maybe<ResolversTypes["Address"]>, ParentType, ContextType>
  __isTypeOf?: isTypeOfResolverFn<ParentType>
}

export type Resolvers<ContextType = any> = {
  Address?: AddressResolvers<ContextType>
  DateTime?: GraphQLScalarType
  MenuItem?: MenuItemResolvers<ContextType>
  MenuResult?: MenuResultResolvers<ContextType>
  Order?: OrderResolvers<ContextType>
  OrderItem?: OrderItemResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  User?: UserResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>
