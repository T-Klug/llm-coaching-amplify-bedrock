import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

export enum OpenAiRoleType {
  SYSTEM = "SYSTEM",
  ASSISTANT = "ASSISTANT",
  USER = "USER"
}

type EagerMessagesType = {
  readonly role?: OpenAiRoleType | keyof typeof OpenAiRoleType | null;
  readonly content?: string | null;
}

type LazyMessagesType = {
  readonly role?: OpenAiRoleType | keyof typeof OpenAiRoleType | null;
  readonly content?: string | null;
}

export declare type MessagesType = LazyLoading extends LazyLoadingDisabled ? EagerMessagesType : LazyMessagesType

export declare const MessagesType: (new (init: ModelInit<MessagesType>) => MessagesType)

type EagerOpenAIChat = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OpenAIChat, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly messages?: (MessagesType | null)[] | null;
  readonly user?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyOpenAIChat = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OpenAIChat, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly messages?: (MessagesType | null)[] | null;
  readonly user?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type OpenAIChat = LazyLoading extends LazyLoadingDisabled ? EagerOpenAIChat : LazyOpenAIChat

export declare const OpenAIChat: (new (init: ModelInit<OpenAIChat>) => OpenAIChat) & {
  copyOf(source: OpenAIChat, mutator: (draft: MutableModel<OpenAIChat>) => MutableModel<OpenAIChat> | void): OpenAIChat;
}

type EagerOpenAIModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OpenAIModel, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly prompt: string;
  readonly model: string;
  readonly temperature: string;
  readonly top_p: string;
  readonly max_tokens: string;
  readonly presence_penalty: string;
  readonly frequency_penalty: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyOpenAIModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OpenAIModel, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly prompt: string;
  readonly model: string;
  readonly temperature: string;
  readonly top_p: string;
  readonly max_tokens: string;
  readonly presence_penalty: string;
  readonly frequency_penalty: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type OpenAIModel = LazyLoading extends LazyLoadingDisabled ? EagerOpenAIModel : LazyOpenAIModel

export declare const OpenAIModel: (new (init: ModelInit<OpenAIModel>) => OpenAIModel) & {
  copyOf(source: OpenAIModel, mutator: (draft: MutableModel<OpenAIModel>) => MutableModel<OpenAIModel> | void): OpenAIModel;
}

type EagerFeedback = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Feedback, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly like?: boolean | null;
  readonly comment?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFeedback = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Feedback, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly like?: boolean | null;
  readonly comment?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Feedback = LazyLoading extends LazyLoadingDisabled ? EagerFeedback : LazyFeedback

export declare const Feedback: (new (init: ModelInit<Feedback>) => Feedback) & {
  copyOf(source: Feedback, mutator: (draft: MutableModel<Feedback>) => MutableModel<Feedback> | void): Feedback;
}

type EagerUserProfile = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserProfile, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly name?: string | null;
  readonly personalityTest?: string | null;
  readonly background?: string | null;
  readonly phone?: string | null;
  readonly optInText?: boolean | null;
  readonly completedIcebreakers?: boolean | null;
  readonly userSummary?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUserProfile = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserProfile, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userId?: string | null;
  readonly name?: string | null;
  readonly personalityTest?: string | null;
  readonly background?: string | null;
  readonly phone?: string | null;
  readonly optInText?: boolean | null;
  readonly completedIcebreakers?: boolean | null;
  readonly userSummary?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type UserProfile = LazyLoading extends LazyLoadingDisabled ? EagerUserProfile : LazyUserProfile

export declare const UserProfile: (new (init: ModelInit<UserProfile>) => UserProfile) & {
  copyOf(source: UserProfile, mutator: (draft: MutableModel<UserProfile>) => MutableModel<UserProfile> | void): UserProfile;
}

type EagerIcebreakerChat = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<IcebreakerChat, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly messages?: (MessagesType | null)[] | null;
  readonly user?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyIcebreakerChat = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<IcebreakerChat, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly messages?: (MessagesType | null)[] | null;
  readonly user?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type IcebreakerChat = LazyLoading extends LazyLoadingDisabled ? EagerIcebreakerChat : LazyIcebreakerChat

export declare const IcebreakerChat: (new (init: ModelInit<IcebreakerChat>) => IcebreakerChat) & {
  copyOf(source: IcebreakerChat, mutator: (draft: MutableModel<IcebreakerChat>) => MutableModel<IcebreakerChat> | void): IcebreakerChat;
}

type EagerRoleplayChat = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RoleplayChat, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly messages?: (MessagesType | null)[] | null;
  readonly user?: string | null;
  readonly roleplayId?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRoleplayChat = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RoleplayChat, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly messages?: (MessagesType | null)[] | null;
  readonly user?: string | null;
  readonly roleplayId?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type RoleplayChat = LazyLoading extends LazyLoadingDisabled ? EagerRoleplayChat : LazyRoleplayChat

export declare const RoleplayChat: (new (init: ModelInit<RoleplayChat>) => RoleplayChat) & {
  copyOf(source: RoleplayChat, mutator: (draft: MutableModel<RoleplayChat>) => MutableModel<RoleplayChat> | void): RoleplayChat;
}