import { useQuery } from '@tanstack/react-query';
import { getGitHubUser } from '@/features/profile/services/github.service.ts';

const QUERY_KEYS = {
  GITHUB_USER: 'github-user',
};

export function useGitHubUser(enabled = true) {
  return useQuery({
    queryKey: [QUERY_KEYS.GITHUB_USER],
    queryFn: getGitHubUser,
    enabled,
  });
}
