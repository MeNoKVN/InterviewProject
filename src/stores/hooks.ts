import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

//*USE DISPATCH*//
export const useAppDispatch = () => useDispatch<AppDispatch>();

//*USE SELECTOR*//
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 