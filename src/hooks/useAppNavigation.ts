import { useNavigation, NavigationProp } from '@react-navigation/native';
import { 
  RootStackParamList, 
  AuthStackParamList, 
  AuthorizedStackParamList,
  ContentStackParamList 
} from '@/types/navigation';


//i dont think this is needed
export const useRootNavigation = () => 
  useNavigation<NavigationProp<RootStackParamList>>();

export const useAuthNavigation = () => 
  useNavigation<NavigationProp<AuthStackParamList>>();

export const useAuthorizedNavigation = () => 
  useNavigation<NavigationProp<AuthorizedStackParamList>>();

export const useContentNavigation = () => 
  useNavigation<NavigationProp<ContentStackParamList>>(); 