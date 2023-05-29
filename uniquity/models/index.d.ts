import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

export enum OpenAiRoleType {
  SYSTEM = "SYSTEM",
  ASSISTANT = "ASSISTANT",
  USER = "USER"
}

export enum PromptType {
  SYSTEM = "SYSTEM"
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

type EagerSystemPrompt = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SystemPrompt, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly prompt: string;
  readonly type?: PromptType | keyof typeof PromptType | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySystemPrompt = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SystemPrompt, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly prompt: string;
  readonly type?: PromptType | keyof typeof PromptType | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SystemPrompt = LazyLoading extends LazyLoadingDisabled ? EagerSystemPrompt : LazySystemPrompt

export declare const SystemPrompt: (new (init: ModelInit<SystemPrompt>) => SystemPrompt) & {
  copyOf(source: SystemPrompt, mutator: (draft: MutableModel<SystemPrompt>) => MutableModel<SystemPrompt> | void): SystemPrompt;
}