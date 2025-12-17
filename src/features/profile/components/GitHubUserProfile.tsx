import {
	Award,
	BookOpen,
	Briefcase,
	Building2,
	Calendar,
	Code2,
	ExternalLink,
	GitFork,
	Globe,
	KeyRound,
	Mail,
	MapPin,
	Star,
	Users,
	X,
	Zap,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import type { GitHubUser } from '@/features/profile/types';
import { useDisclosure } from '@/hooks/use-disclosure';
import { humanizeDate } from '@/utils/humanize.ts';
import { InfoRow } from './InfoRow';
import { StatCard } from './StatCard';
import { UpdatePasswordModal } from './UpdatePasswordModal';

interface GitHubUserProfileProps {
	user: GitHubUser;
}

export const GitHubUserProfile = ({ user }: GitHubUserProfileProps) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const getGreeting = () => {
		const hour = new Date().getHours();
		if (hour < 12) return 'Good morning';
		if (hour < 18) return 'Good afternoon';
		return 'Good evening';
	};

	return (
		<div className="w-full space-y-4 sm:space-y-5">
			{/* Hero Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="relative overflow-hidden rounded-2xl border border-[var(--border)]/50 bg-gradient-to-br from-[var(--system-blue)]/10 via-[var(--system-purple)]/10 to-[var(--system-pink)]/10 p-6 sm:p-8"
			>
				{/* Decorative Background */}
				<div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-[var(--system-blue)]/5 blur-3xl" />
				<div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[var(--system-purple)]/5 blur-3xl" />

				{/* Update Password Button */}
				<div className="absolute top-4 right-4 z-20">
					<Button onClick={onOpen} variant="outline" size="icon">
						<KeyRound className="h-5 w-5" />
					</Button>
				</div>

				<div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:gap-8">
					{/* Avatar Section */}
					<motion.div
						initial={{ scale: 0.9 }}
						animate={{ scale: 1 }}
						transition={{ type: 'spring', stiffness: 200 }}
						className="mx-auto flex-shrink-0 sm:mx-0"
					>
						<div className="relative">
							<Avatar className="h-28 w-28 border-4 border-[var(--border)]/50 shadow-xl sm:h-32 sm:w-32">
								<AvatarImage src={user.avatar_url} alt={user.name || user.login} />
								<AvatarFallback className="bg-gradient-to-br from-[var(--system-blue)] to-[var(--system-purple)] text-4xl text-white">
									{user.login[0].toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<div className="absolute -right-2 -bottom-2 rounded-full border-2 border-[var(--card-bg)] bg-[var(--system-green)] p-2">
								<Zap className="h-4 w-4 text-white" />
							</div>
						</div>
					</motion.div>

					{/* Profile Info */}
					<div className="flex-1 space-y-3">
						<div className="text-center sm:text-left">
							<Typography variant="muted" className="text-center sm:text-left">
								{getGreeting()}! 👋
							</Typography>
							<Typography variant="h1" className="text-center sm:text-left">
								{user.name || user.login}
							</Typography>
							<Typography variant="large" className="text-center sm:text-left">
								@{user.login}
							</Typography>
						</div>

						{user.bio && (
							<Typography variant="p" className="text-center sm:text-left">
								{user.bio}
							</Typography>
						)}

						{/* Meta Info */}
						<div className="flex flex-wrap justify-center gap-2 text-[var(--secondaryLabel)] text-sm sm:justify-start">
							<div className="flex items-center gap-1.5 rounded-md bg-[var(--control-bg)] px-2.5 py-1">
								<Briefcase className="h-4 w-4" />
								<Typography variant="muted">{user.type}</Typography>
							</div>
							{user.hireable !== null && (
								<div className="flex items-center gap-1.5 rounded-md border border-[var(--system-green)]/20 bg-[var(--system-green)]/10 px-2.5 py-1">
									<Award className="h-4 w-4 text-[var(--system-green)]" />
									<Typography variant="muted">
										{user.hireable ? 'Available for Hire' : 'Not Hiring'}
									</Typography>
								</div>
							)}
							{user.company && (
								<div className="flex items-center gap-1.5 rounded-md bg-[var(--control-bg)] px-2.5 py-1">
									<Building2 className="h-4 w-4" />
									<Typography variant="muted">{user.company}</Typography>
								</div>
							)}
							{user.location && (
								<div className="flex items-center gap-1.5 rounded-md bg-[var(--control-bg)] px-2.5 py-1">
									<MapPin className="h-4 w-4" />
									<Typography variant="muted">{user.location}</Typography>
								</div>
							)}
							<div className="flex items-center gap-1.5 rounded-md bg-[var(--control-bg)] px-2.5 py-1">
								<Calendar className="h-4 w-4" />
								<Typography variant="muted">Joined {humanizeDate(user.created_at)}</Typography>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="flex flex-wrap justify-center gap-2 sm:justify-start">
							{user.email && (
								<Typography
									variant="a"
									href={`mailto:${user.email}`}
									className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)]/50 bg-[var(--control-bg)] px-4 py-2 transition-all hover:scale-105 hover:bg-[var(--control-hover-bg)]"
								>
									<Mail className="h-4 w-4 text-[var(--label)]" />
									<Typography variant="small" className="text-[var(--label)]">
										Email
									</Typography>
								</Typography>
							)}
							{user.twitter_username && (
								<Typography
									variant="a"
									href={`https://twitter.com/${user.twitter_username}`}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)]/50 bg-[var(--control-bg)] px-4 py-2 transition-all hover:scale-105 hover:bg-[var(--control-hover-bg)]"
								>
									<X className="h-4 w-4 text-[var(--label)]" />
									<Typography variant="small">Twitter</Typography>
								</Typography>
							)}
							{user.blog && (
								<Typography
									variant="a"
									href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)]/50 bg-[var(--control-bg)] px-4 py-2 transition-all hover:scale-105 hover:bg-[var(--control-hover-bg)]"
								>
									<Globe className="h-4 w-4 text-[var(--label)]" />
									<Typography variant="small">Website</Typography>
								</Typography>
							)}
							<Typography
								variant="a"
								href={user.html_url}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 rounded-lg bg-[var(--system-blue)] px-4 py-2 transition-all hover:scale-105 hover:bg-[var(--system-blue)]/90"
							>
								<ExternalLink className="h-4 w-4 text-white" />
								<Typography variant="small" className="text-white">
									View GitHub
								</Typography>
							</Typography>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Stats Grid */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
				className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
			>
				<StatCard
					icon={Code2}
					label="Public Repositories"
					value={user.public_repos}
					gradient="from-[var(--system-blue)]/10 to-[var(--system-blue)]/5"
					description="Code projects"
				/>
				<StatCard
					icon={GitFork}
					label="Public Gists"
					value={user.public_gists}
					gradient="from-[var(--system-purple)]/10 to-[var(--system-purple)]/5"
					description="Code snippets"
				/>
				<StatCard
					icon={Users}
					label="Followers"
					value={user.followers}
					gradient="from-[var(--system-pink)]/10 to-[var(--system-pink)]/5"
					description="Community"
				/>
				<StatCard
					icon={Star}
					label="Following"
					value={user.following}
					gradient="from-[var(--system-yellow)]/10 to-[var(--system-yellow)]/5"
					description="Connections"
				/>
			</motion.div>

			{/* More Details */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
			>
				<div className="relative overflow-hidden rounded-xl border border-[var(--border)]/50 bg-gradient-to-br from-[var(--card-bg)] to-[var(--card-bg)]/80 p-4 shadow-sm sm:p-5">
					{/* Decorative elements */}
					<div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-[var(--system-blue)]/5 blur-2xl" />
					<div className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-[var(--system-purple)]/5 blur-2xl" />

					<div className="relative z-10">
						<div className="mb-4 flex items-center gap-2">
							<div className="rounded-lg bg-gradient-to-br from-[var(--system-blue)]/20 to-[var(--system-purple)]/20 p-2 shadow-sm">
								<BookOpen className="h-4 w-4 text-[var(--system-blue)] sm:h-5 sm:w-5" />
							</div>
							<Typography variant="large">More Details</Typography>
						</div>
						<div className="grid gap-3 sm:grid-cols-2">
							<InfoRow icon={BookOpen} label="Public Repos" value={user.public_repos.toString()} />
							<InfoRow icon={GitFork} label="Public Gists" value={user.public_gists.toString()} />
							<InfoRow icon={Calendar} label="Member Since" value={humanizeDate(user.created_at)} />
							<InfoRow icon={Calendar} label="Last Updated" value={humanizeDate(user.updated_at)} />
						</div>
					</div>
				</div>
			</motion.div>

			<UpdatePasswordModal open={isOpen} onOpenChange={onOpenChange} />
		</div>
	);
};
