import React, { Context } from 'react';
import { EditorContext, EditorContextValue } from './editorContext';

export const useEditorContext = <T>() =>
  React.useContext<EditorContextValue<T>>(EditorContext as Context<EditorContextValue<T>>);
