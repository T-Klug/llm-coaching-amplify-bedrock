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

type EagerRoleChat = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RoleChat, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly messages?: (MessagesType | null)[] | null;
  readonly user?: string | null;
  readonly roleplayId?: string | null;
  readonly scenario?: string | null;
  readonly difficulty?: string | null;
  readonly scenarioPrompt?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRoleChat = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RoleChat, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly messages?: (MessagesType | null)[] | null;
  readonly user?: string | null;
  readonly roleplayId?: string | null;
  readonly scenario?: string | null;
  readonly difficulty?: string | null;
  readonly scenarioPrompt?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type RoleChat = LazyLoading extends LazyLoadingDisabled ? EagerRoleChat : LazyRoleChat

export declare const RoleChat: (new (init: ModelInit<RoleChat>) => RoleChat) & {
  copyOf(source: RoleChat, mutator: (draft: MutableModel<RoleChat>) => MutableModel<RoleChat> | void): RoleChat;
}

type EagerRoleSummaary = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RoleSummaary, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly summary?: string | null;
  readonly user?: string | null;
  readonly roleplayId?: string | null;
  readonly scenario?: string | null;
  readonly difficulty?: string | null;
  readonly scenarioPrompt?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRoleSummaary = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RoleSummaary, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly summary?: string | null;
  readonly user?: string | null;
  readonly roleplayId?: string | null;
  readonly scenario?: string | null;
  readonly difficulty?: string | null;
  readonly scenarioPrompt?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type RoleSummaary = LazyLoading extends LazyLoadingDisabled ? EagerRoleSummaary : LazyRoleSummaary

export declare const RoleSummaary: (new (init: ModelInit<RoleSummaary>) => RoleSummaary) & {
  copyOf(source: RoleSummaary, mutator: (draft: MutableModel<RoleSummaary>) => MutableModel<RoleSummaary> | void): RoleSummaary;
}