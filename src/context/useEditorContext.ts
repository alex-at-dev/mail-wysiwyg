import React, { Context } from 'react';
import { EditorContextValue } from '../types/EditorContextValue';
import { EditorContext } from './editorContext';

export const useEditorContext = <T>() =>
  React.useContext<EditorContextValue<T>>(EditorContext as Context<EditorContextValue<T>>);
