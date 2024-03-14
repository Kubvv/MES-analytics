import {
  useSelector,
  useDispatch,
  type TypedUseSelectorHook
} from 'react-redux'
import type { RootState, AppDispatch } from './store'

type DispatchFunc = () => AppDispatch
export const useTypeDispatch: DispatchFunc = useDispatch
export const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector
