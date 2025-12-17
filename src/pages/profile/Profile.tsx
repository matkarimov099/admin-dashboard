import { Typography } from '@/components/ui/typography';
import { GitHubUserProfile } from '@/features/profile/components/GitHubUserProfile';
import { RegularUserProfile } from '@/features/profile/components/RegularUserProfile';
import { useGitHubUser } from '@/features/profile/hooks/use-github-user';
import { useAuthContext } from '@/hooks/use-auth-context';

export default function Profile() {
	const { currentUser } = useAuthContext();
	const { data: githubUser, isLoading: isGithubLoading } = useGitHubUser(
		currentUser?.isGithubMember ?? false
	);

	// Loading state
	if (currentUser?.isGithubMember && isGithubLoading) {
		return (
			<div className="container mx-auto py-8">
				<div className="mx-auto flex min-h-[400px] max-w-4xl items-center justify-center">
					<Typography variant="large" className="text-[var(--secondaryLabel)]">
						Loading profile...
					</Typography>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full px-2 py-4">
			{currentUser?.isGithubMember && githubUser?.data ? (
				<GitHubUserProfile user={githubUser.data} />
			) : currentUser ? (
				<div className="mx-auto max-w-4xl">
					<RegularUserProfile user={currentUser} />
				</div>
			) : (
				<div className="mx-auto max-w-4xl text-center">
					<Typography variant="h1">Welcome! 👋</Typography>
					<Typography variant="large" className="mt-4 text-[var(--secondaryLabel)]">
						Please log in to view your profile
					</Typography>
				</div>
			)}
		</div>
	);
}
