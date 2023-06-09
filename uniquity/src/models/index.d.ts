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