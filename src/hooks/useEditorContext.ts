import React, { Context } from 'react';
import { EditorContext } from '../context/editorContext';
import { EditorContextValue } from '../types/EditorContextValue';

export const useEditorContext = <T>() =>
  React.useContext<EditorContextValue<T>>(EditorContext as Context<EditorContextValue<T>>);
