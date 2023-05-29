import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerSystemPrompt = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SystemPrompt, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly prompts?: string[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySystemPrompt = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SystemPrompt, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly prompts?: string[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SystemPrompt = LazyLoading extends LazyLoadingDisabled ? EagerSystemPrompt : LazySystemPrompt

export declare const SystemPrompt: (new (init: ModelInit<SystemPrompt>) => SystemPrompt) & {
  copyOf(source: SystemPrompt, mutator: (draft: MutableModel<SystemPrompt>) => MutableModel<SystemPrompt> | void): SystemPrompt;
}