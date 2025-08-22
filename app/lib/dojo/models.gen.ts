import type { SchemaType as ISchemaType } from "@dojoengine/sdk";

import { CairoCustomEnum, CairoOption, CairoOptionVariant, BigNumberish } from 'starknet';

// Type definition for `evolute_duel::models::challenge::Challenge` struct
export interface Challenge {
	duel_id: BigNumberish;
	duel_type: DuelTypeEnum;
	address_a: string;
	address_b: string;
	state: ChallengeStateEnum;
	winner: BigNumberish;
	timestamps: Period;
}

// Type definition for `evolute_duel::models::config::CoinConfig` struct
export interface CoinConfig {
	coin_address: string;
	admin_address: string;
}

// Type definition for `evolute_duel::models::config::EvltConfig` struct
export interface EvltConfig {
	config_id: BigNumberish;
	token_address: string;
	admin_address: string;
	total_supply_cap: BigNumberish;
	is_paused: boolean;
	staking_enabled: boolean;
}

// Type definition for `evolute_duel::models::config::GrndConfig` struct
export interface GrndConfig {
	config_id: BigNumberish;
	token_address: string;
	game_system_address: string;
	faucet_amount: BigNumberish;
	faucet_enabled: boolean;
	reward_multiplier: BigNumberish;
	daily_reward_cap: BigNumberish;
	burn_on_upgrade: boolean;
}

// Type definition for `evolute_duel::models::game::AvailableTiles` struct
export interface AvailableTiles {
	board_id: BigNumberish;
	player: string;
	available_tiles: Array<BigNumberish>;
}

// Type definition for `evolute_duel::models::game::Board` struct
export interface Board {
	id: BigNumberish;
	available_tiles_in_deck: Array<BigNumberish>;
	top_tile: CairoOption<BigNumberish>;
	player1: [string, PlayerSide, BigNumberish];
	player2: [string, PlayerSide, BigNumberish];
	blue_score: [BigNumberish, BigNumberish];
	red_score: [BigNumberish, BigNumberish];
	last_move_id: CairoOption<BigNumberish>;
	game_state: GameStateEnum;
	moves_done: BigNumberish;
	commited_tile: CairoOption<BigNumberish>;
	phase_started_at: BigNumberish;
}

// Type definition for `evolute_duel::models::game::Game` struct
export interface Game {
	player: string;
	status: GameStatusEnum;
	board_id: CairoOption<BigNumberish>;
	game_mode: GameModeEnum;
}

// Type definition for `evolute_duel::models::game::GameConfig` struct
export interface GameConfig {
	game_mode: GameModeEnum;
	board_size: BigNumberish;
	deck_type: BigNumberish;
	initial_jokers: BigNumberish;
	time_per_phase: BigNumberish;
	auto_match: boolean;
	deck: Array<BigNumberish>;
	edges: [BigNumberish, BigNumberish];
	joker_price: BigNumberish;
}

// Type definition for `evolute_duel::models::game::MatchmakingState` struct
export interface MatchmakingState {
	game_mode: GameModeEnum;
	tournament_id: BigNumberish;
	waiting_players: Array<string>;
	queue_counter: BigNumberish;
}

// Type definition for `evolute_duel::models::game::Move` struct
export interface Move {
	id: BigNumberish;
	player_side: PlayerSideEnum;
	prev_move_id: CairoOption<BigNumberish>;
	tile: CairoOption<BigNumberish>;
	rotation: BigNumberish;
	col: BigNumberish;
	row: BigNumberish;
	is_joker: boolean;
	first_board_id: BigNumberish;
	timestamp: BigNumberish;
	top_tile: CairoOption<BigNumberish>;
}

// Type definition for `evolute_duel::models::game::PlayerMatchmaking` struct
export interface PlayerMatchmaking {
	player: string;
	game_mode: GameModeEnum;
	tournament_id: BigNumberish;
	timestamp: BigNumberish;
}

// Type definition for `evolute_duel::models::game::Rules` struct
export interface Rules {
	id: BigNumberish;
	deck: Array<BigNumberish>;
	edges: [BigNumberish, BigNumberish];
	joker_number: BigNumberish;
	joker_price: BigNumberish;
}

// Type definition for `evolute_duel::models::game::TileCommitments` struct
export interface TileCommitments {
	board_id: BigNumberish;
	player: string;
	tile_commitments: Array<BigNumberish>;
}

// Type definition for `evolute_duel::models::migration::MigrationRequest` struct
export interface MigrationRequest {
	guest_address: string;
	controller_address: string;
	requested_at: BigNumberish;
	expires_at: BigNumberish;
	status: BigNumberish;
}

// Type definition for `evolute_duel::models::pact::Pact` struct
export interface Pact {
	pair: BigNumberish;
	duel_type: DuelTypeEnum;
	player_a: string;
	player_b: string;
	timestamp: BigNumberish;
}

// Type definition for `evolute_duel::models::player::Player` struct
export interface Player {
	player_id: string;
	username: BigNumberish;
	balance: BigNumberish;
	games_played: BigNumberish;
	active_skin: BigNumberish;
	role: BigNumberish;
	tutorial_completed: boolean;
	migration_target: string;
	migration_initiated_at: BigNumberish;
	migration_used: boolean;
}

// Type definition for `evolute_duel::models::player::PlayerAssignment` struct
export interface PlayerAssignment {
	player_address: string;
	duel_id: BigNumberish;
	pass_id: BigNumberish;
}

// Type definition for `evolute_duel::models::scoreboard::Scoreboard` struct
export interface Scoreboard {
	tournament_id: BigNumberish;
	player_address: string;
	score: BigNumberish;
}

// Type definition for `evolute_duel::models::scoring::PotentialContests` struct
export interface PotentialContests {
	board_id: BigNumberish;
	potential_contests: Array<BigNumberish>;
}

// Type definition for `evolute_duel::models::scoring::UnionNode` struct
export interface UnionNode {
	board_id: BigNumberish;
	position: BigNumberish;
	parent: BigNumberish;
	rank: BigNumberish;
	blue_points: BigNumberish;
	red_points: BigNumberish;
	open_edges: BigNumberish;
	contested: boolean;
	node_type: TEdgeEnum;
	player_side: PlayerSideEnum;
}

// Type definition for `evolute_duel::models::skins::Shop` struct
export interface Shop {
	shop_id: BigNumberish;
	skin_prices: Array<BigNumberish>;
}

// Type definition for `evolute_duel::models::tournament::PlayerTournamentIndex` struct
export interface PlayerTournamentIndex {
	player_address: string;
	tournament_id: BigNumberish;
	pass_id: BigNumberish;
}

// Type definition for `evolute_duel::models::tournament::TournamentChallenge` struct
export interface TournamentChallenge {
	challenge_id: BigNumberish;
	tournament_id: BigNumberish;
}

// Type definition for `evolute_duel::models::tournament::TournamentPass` struct
export interface TournamentPass {
	pass_id: BigNumberish;
	tournament_id: BigNumberish;
	player_address: string;
	entry_number: BigNumberish;
	rating: BigNumberish;
	games_played: BigNumberish;
	wins: BigNumberish;
	losses: BigNumberish;
}

// Type definition for `evolute_duel::models::tournament::TournamentSettings` struct
export interface TournamentSettings {
	settings_id: BigNumberish;
	tournament_type: TournamentTypeEnum;
}

// Type definition for `evolute_duel::models::tournament_balance::TournamentBalance` struct
export interface TournamentBalance {
	player_address: string;
	tournament_id: BigNumberish;
	eevlt_balance: BigNumberish;
}

// Type definition for `evolute_duel::types::timestamp::Period` struct
export interface Period {
	start: BigNumberish;
	end: BigNumberish;
}

// Type definition for `tournaments::components::models::game::GameCounter` struct
export interface GameCounter {
	key: BigNumberish;
	count: BigNumberish;
}

// Type definition for `tournaments::components::models::game::GameMetadata` struct
export interface GameMetadata {
	contract_address: string;
	creator_address: string;
	name: BigNumberish;
	description: string;
	developer: BigNumberish;
	publisher: BigNumberish;
	genre: BigNumberish;
	image: string;
}

// Type definition for `tournaments::components::models::game::Score` struct
export interface Score {
	game_id: BigNumberish;
	score: BigNumberish;
}

// Type definition for `tournaments::components::models::game::Settings` struct
export interface Settings {
	id: BigNumberish;
	name: BigNumberish;
	value: BigNumberish;
}

// Type definition for `tournaments::components::models::game::SettingsCounter` struct
export interface SettingsCounter {
	key: BigNumberish;
	count: BigNumberish;
}

// Type definition for `tournaments::components::models::game::SettingsDetails` struct
export interface SettingsDetails {
	id: BigNumberish;
	name: BigNumberish;
	description: string;
	exists: boolean;
}

// Type definition for `tournaments::components::models::game::TokenMetadata` struct
export interface TokenMetadata {
	token_id: BigNumberish;
	minted_by: string;
	player_name: BigNumberish;
	settings_id: BigNumberish;
	lifecycle: Lifecycle;
}

// Type definition for `tournaments::components::models::lifecycle::Lifecycle` struct
export interface Lifecycle {
	mint: BigNumberish;
	start: CairoOption<BigNumberish>;
	end: CairoOption<BigNumberish>;
}

// Type definition for `tournaments::components::models::schedule::Period` struct
export interface Period {
	start: BigNumberish;
	end: BigNumberish;
}

// Type definition for `tournaments::components::models::schedule::Schedule` struct
export interface Schedule {
	registration: CairoOption<Period>;
	game: Period;
	submission_duration: BigNumberish;
}

// Type definition for `tournaments::components::models::tournament::ERC20Data` struct
export interface ERC20Data {
	amount: BigNumberish;
}

// Type definition for `tournaments::components::models::tournament::ERC721Data` struct
export interface ERC721Data {
	id: BigNumberish;
}

// Type definition for `tournaments::components::models::tournament::EntryCount` struct
export interface EntryCount {
	tournament_id: BigNumberish;
	count: BigNumberish;
}

// Type definition for `tournaments::components::models::tournament::EntryFee` struct
export interface EntryFee {
	token_address: string;
	amount: BigNumberish;
	distribution: Array<BigNumberish>;
	tournament_creator_share: CairoOption<BigNumberish>;
	game_creator_share: CairoOption<BigNumberish>;
}

// Type definition for `tournaments::components::models::tournament::EntryRequirement` struct
export interface EntryRequirement {
	entry_limit: BigNumberish;
	entry_requirement_type: EntryRequirementTypeEnum;
}

// Type definition for `tournaments::components::models::tournament::GameConfig` struct
export interface GameConfig {
	address: string;
	settings_id: BigNumberish;
	prize_spots: BigNumberish;
}

// Type definition for `tournaments::components::models::tournament::Leaderboard` struct
export interface Leaderboard {
	tournament_id: BigNumberish;
	token_ids: Array<BigNumberish>;
}

// Type definition for `tournaments::components::models::tournament::Metadata` struct
export interface Metadata {
	name: BigNumberish;
	description: string;
}

// Type definition for `tournaments::components::models::tournament::NFTQualification` struct
export interface NFTQualification {
	token_id: BigNumberish;
}

// Type definition for `tournaments::components::models::tournament::PlatformMetrics` struct
export interface PlatformMetrics {
	key: BigNumberish;
	total_tournaments: BigNumberish;
}

// Type definition for `tournaments::components::models::tournament::Prize` struct
export interface Prize {
	id: BigNumberish;
	tournament_id: BigNumberish;
	payout_position: BigNumberish;
	token_address: string;
	token_type: TokenTypeEnum;
	sponsor_address: string;
}

// Type definition for `tournaments::components::models::tournament::PrizeClaim` struct
export interface PrizeClaim {
	tournament_id: BigNumberish;
	prize_type: PrizeTypeEnum;
	claimed: boolean;
}

// Type definition for `tournaments::components::models::tournament::PrizeMetrics` struct
export interface PrizeMetrics {
	key: BigNumberish;
	total_prizes: BigNumberish;
}

// Type definition for `tournaments::components::models::tournament::QualificationEntries` struct
export interface QualificationEntries {
	tournament_id: BigNumberish;
	qualification_proof: QualificationProofEnum;
	entry_count: BigNumberish;
}

// Type definition for `tournaments::components::models::tournament::Registration` struct
export interface Registration {
	game_address: string;
	game_token_id: BigNumberish;
	tournament_id: BigNumberish;
	entry_number: BigNumberish;
	has_submitted: boolean;
}

// Type definition for `tournaments::components::models::tournament::Token` struct
export interface Token {
	address: string;
	name: string;
	symbol: string;
	token_type: TokenTypeEnum;
	is_registered: boolean;
}

// Type definition for `tournaments::components::models::tournament::Tournament` struct
export interface Tournament {
	id: BigNumberish;
	created_at: BigNumberish;
	created_by: string;
	creator_token_id: BigNumberish;
	metadata: Metadata;
	schedule: Schedule;
	game_config: GameConfig;
	entry_fee: CairoOption<EntryFee>;
	entry_requirement: CairoOption<EntryRequirement>;
}

// Type definition for `tournaments::components::models::tournament::TournamentConfig` struct
export interface TournamentConfig {
	key: BigNumberish;
	safe_mode: boolean;
	test_mode: boolean;
}

// Type definition for `tournaments::components::models::tournament::TournamentQualification` struct
export interface TournamentQualification {
	tournament_id: BigNumberish;
	token_id: BigNumberish;
	position: BigNumberish;
}

// Type definition for `tournaments::components::models::tournament::TournamentTokenMetrics` struct
export interface TournamentTokenMetrics {
	key: BigNumberish;
	total_supply: BigNumberish;
}

// Type definition for `achievement::events::index::TrophyCreation` struct
export interface TrophyCreation {
	id: BigNumberish;
	hidden: boolean;
	index: BigNumberish;
	points: BigNumberish;
	start: BigNumberish;
	end: BigNumberish;
	group: BigNumberish;
	icon: BigNumberish;
	title: BigNumberish;
	description: string;
	tasks: Array<Task>;
	data: string;
}

// Type definition for `achievement::events::index::TrophyProgression` struct
export interface TrophyProgression {
	player_id: BigNumberish;
	task_id: BigNumberish;
	count: BigNumberish;
	time: BigNumberish;
}

// Type definition for `achievement::types::index::Task` struct
export interface Task {
	id: BigNumberish;
	total: BigNumberish;
	description: string;
}

// Type definition for `evolute_duel::events::BoardUpdated` struct
export interface BoardUpdated {
	board_id: BigNumberish;
	top_tile: CairoOption<BigNumberish>;
	player1: [string, PlayerSide, BigNumberish];
	player2: [string, PlayerSide, BigNumberish];
	blue_score: [BigNumberish, BigNumberish];
	red_score: [BigNumberish, BigNumberish];
	last_move_id: CairoOption<BigNumberish>;
	moves_done: BigNumberish;
	game_state: GameStateEnum;
}

// Type definition for `evolute_duel::events::CityContestDraw` struct
export interface CityContestDraw {
	board_id: BigNumberish;
	root: BigNumberish;
	red_points: BigNumberish;
	blue_points: BigNumberish;
}

// Type definition for `evolute_duel::events::CityContestWon` struct
export interface CityContestWon {
	board_id: BigNumberish;
	root: BigNumberish;
	winner: PlayerSideEnum;
	red_points: BigNumberish;
	blue_points: BigNumberish;
}

// Type definition for `evolute_duel::events::EmergencyMigrationCancelled` struct
export interface EmergencyMigrationCancelled {
	guest_address: string;
	admin_address: string;
	reason: string;
}

// Type definition for `evolute_duel::events::ErrorEvent` struct
export interface ErrorEvent {
	player_address: string;
	name: BigNumberish;
	message: string;
}

// Type definition for `evolute_duel::events::GameCanceleFailed` struct
export interface GameCanceleFailed {
	host_player: string;
	status: GameStatusEnum;
}

// Type definition for `evolute_duel::events::GameCanceled` struct
export interface GameCanceled {
	host_player: string;
	status: GameStatusEnum;
}

// Type definition for `evolute_duel::events::GameCreateFailed` struct
export interface GameCreateFailed {
	host_player: string;
	status: GameStatusEnum;
}

// Type definition for `evolute_duel::events::GameCreated` struct
export interface GameCreated {
	host_player: string;
	status: GameStatusEnum;
}

// Type definition for `evolute_duel::events::GameFinished` struct
export interface GameFinished {
	player: string;
	board_id: BigNumberish;
}

// Type definition for `evolute_duel::events::GameJoinFailed` struct
export interface GameJoinFailed {
	host_player: string;
	guest_player: string;
	host_game_status: GameStatusEnum;
	guest_game_status: GameStatusEnum;
}

// Type definition for `evolute_duel::events::GameStarted` struct
export interface GameStarted {
	host_player: string;
	guest_player: string;
	board_id: BigNumberish;
}

// Type definition for `evolute_duel::events::InvalidMove` struct
export interface InvalidMove {
	player: string;
	prev_move_id: CairoOption<BigNumberish>;
	tile: CairoOption<BigNumberish>;
	rotation: BigNumberish;
	col: BigNumberish;
	row: BigNumberish;
	is_joker: boolean;
	board_id: BigNumberish;
}

// Type definition for `evolute_duel::events::MigrationCancelled` struct
export interface MigrationCancelled {
	guest_address: string;
	controller_address: string;
	cancelled_at: BigNumberish;
}

// Type definition for `evolute_duel::events::MigrationCompleted` struct
export interface MigrationCompleted {
	guest_address: string;
	controller_address: string;
	balance_transferred: BigNumberish;
	games_transferred: BigNumberish;
}

// Type definition for `evolute_duel::events::MigrationConfirmed` struct
export interface MigrationConfirmed {
	guest_address: string;
	controller_address: string;
	confirmed_at: BigNumberish;
}

// Type definition for `evolute_duel::events::MigrationError` struct
export interface MigrationError {
	guest_address: string;
	controller_address: string;
	status: BigNumberish;
	error_context: string;
	error_message: string;
}

// Type definition for `evolute_duel::events::MigrationInitiated` struct
export interface MigrationInitiated {
	guest_address: string;
	controller_address: string;
	expires_at: BigNumberish;
}

// Type definition for `evolute_duel::events::Moved` struct
export interface Moved {
	move_id: BigNumberish;
	player: string;
	prev_move_id: CairoOption<BigNumberish>;
	tile: CairoOption<BigNumberish>;
	rotation: BigNumberish;
	col: BigNumberish;
	row: BigNumberish;
	is_joker: boolean;
	board_id: BigNumberish;
	timestamp: BigNumberish;
}

// Type definition for `evolute_duel::events::NotEnoughJokers` struct
export interface NotEnoughJokers {
	player_id: string;
	board_id: BigNumberish;
}

// Type definition for `evolute_duel::events::NotYourTurn` struct
export interface NotYourTurn {
	player_id: string;
	board_id: BigNumberish;
}

// Type definition for `evolute_duel::events::PhaseStarted` struct
export interface PhaseStarted {
	board_id: BigNumberish;
	phase: BigNumberish;
	top_tile: CairoOption<BigNumberish>;
	commited_tile: CairoOption<BigNumberish>;
	started_at: BigNumberish;
}

// Type definition for `evolute_duel::events::PlayerNotInGame` struct
export interface PlayerNotInGame {
	player_id: string;
	board_id: BigNumberish;
}

// Type definition for `evolute_duel::events::PlayerSkinChangeFailed` struct
export interface PlayerSkinChangeFailed {
	player_id: string;
	new_skin: BigNumberish;
	skin_price: BigNumberish;
	balance: BigNumberish;
}

// Type definition for `evolute_duel::events::PlayerSkinChanged` struct
export interface PlayerSkinChanged {
	player_id: string;
	new_skin: BigNumberish;
}

// Type definition for `evolute_duel::events::PlayerUsernameChanged` struct
export interface PlayerUsernameChanged {
	player_id: string;
	new_username: BigNumberish;
}

// Type definition for `evolute_duel::events::RoadContestDraw` struct
export interface RoadContestDraw {
	board_id: BigNumberish;
	root: BigNumberish;
	red_points: BigNumberish;
	blue_points: BigNumberish;
}

// Type definition for `evolute_duel::events::RoadContestWon` struct
export interface RoadContestWon {
	board_id: BigNumberish;
	root: BigNumberish;
	winner: PlayerSideEnum;
	red_points: BigNumberish;
	blue_points: BigNumberish;
}

// Type definition for `evolute_duel::events::Skiped` struct
export interface Skiped {
	move_id: BigNumberish;
	player: string;
	prev_move_id: CairoOption<BigNumberish>;
	board_id: BigNumberish;
	timestamp: BigNumberish;
}

// Type definition for `evolute_duel::events::SnapshotCreateFailed` struct
export interface SnapshotCreateFailed {
	player: string;
	board_id: BigNumberish;
	board_game_state: GameStateEnum;
	move_number: BigNumberish;
}

// Type definition for `evolute_duel::events::SnapshotCreated` struct
export interface SnapshotCreated {
	snapshot_id: BigNumberish;
	player: string;
	board_id: BigNumberish;
	move_number: BigNumberish;
}

// Type definition for `evolute_duel::events::TutorialCompleted` struct
export interface TutorialCompleted {
	player_id: string;
	completed_at: BigNumberish;
}

// Type definition for `evolute_duel::models::tournament_balance::EevltBurned` struct
export interface EevltBurned {
	player_address: string;
	tournament_id: BigNumberish;
	amount: BigNumberish;
}

// Type definition for `evolute_duel::models::tournament_balance::EevltMinted` struct
export interface EevltMinted {
	player_address: string;
	tournament_id: BigNumberish;
	amount: BigNumberish;
}

// Type definition for `evolute_duel::models::challenge::DuelType` enum
export const duelType = [
	'Undefined',
	'Regular',
	'Tournament',
] as const;
export type DuelType = { [key in typeof duelType[number]]: string };
export type DuelTypeEnum = CairoCustomEnum;

// Type definition for `evolute_duel::models::tournament::TournamentType` enum
export const tournamentType = [
	'Undefined',
	'LastManStanding',
	'BestOfThree',
] as const;
export type TournamentType = { [key in typeof tournamentType[number]]: string };
export type TournamentTypeEnum = CairoCustomEnum;

// Type definition for `evolute_duel::types::challenge_state::ChallengeState` enum
export const challengeState = [
	'Null',
	'Awaiting',
	'Withdrawn',
	'Refused',
	'Expired',
	'InProgress',
	'Resolved',
	'Draw',
] as const;
export type ChallengeState = { [key in typeof challengeState[number]]: string };
export type ChallengeStateEnum = CairoCustomEnum;

// Type definition for `evolute_duel::types::packing::GameMode` enum
export const gameMode = [
	'None',
	'Tutorial',
	'Ranked',
	'Casual',
	'Tournament',
] as const;
export type GameMode = { [key in typeof gameMode[number]]: string };
export type GameModeEnum = CairoCustomEnum;

// Type definition for `evolute_duel::types::packing::GameState` enum
export const gameState = [
	'Creating',
	'Reveal',
	'Request',
	'Move',
	'Finished',
] as const;
export type GameState = { [key in typeof gameState[number]]: string };
export type GameStateEnum = CairoCustomEnum;

// Type definition for `evolute_duel::types::packing::GameStatus` enum
export const gameStatus = [
	'Finished',
	'Created',
	'Canceled',
	'InProgress',
] as const;
export type GameStatus = { [key in typeof gameStatus[number]]: string };
export type GameStatusEnum = CairoCustomEnum;

// Type definition for `evolute_duel::types::packing::PlayerSide` enum
export const playerSide = [
	'None',
	'Blue',
	'Red',
] as const;
export type PlayerSide = { [key in typeof playerSide[number]]: string };
export type PlayerSideEnum = CairoCustomEnum;

// Type definition for `evolute_duel::types::packing::TEdge` enum
export const tEdge = [
	'None',
	'C',
	'R',
	'F',
] as const;
export type TEdge = { [key in typeof tEdge[number]]: string };
export type TEdgeEnum = CairoCustomEnum;

// Type definition for `tournaments::components::models::tournament::EntryRequirementType` enum
export const entryRequirementType = [
	'token',
	'tournament',
	'allowlist',
] as const;
export type EntryRequirementType = { 
	token: string,
	tournament: TournamentTypeEnum,
	allowlist: Array<string>,
};
export type EntryRequirementTypeEnum = CairoCustomEnum;

// Type definition for `tournaments::components::models::tournament::PrizeType` enum
export const prizeType = [
	'EntryFees',
	'Sponsored',
] as const;
export type PrizeType = { 
	EntryFees: RoleEnum,
	Sponsored: BigNumberish,
};
export type PrizeTypeEnum = CairoCustomEnum;

// Type definition for `tournaments::components::models::tournament::QualificationProof` enum
export const qualificationProof = [
	'Tournament',
	'NFT',
	'Address',
] as const;
export type QualificationProof = { 
	Tournament: TournamentQualification,
	NFT: NFTQualification,
	Address: string,
};
export type QualificationProofEnum = CairoCustomEnum;

// Type definition for `tournaments::components::models::tournament::Role` enum
export const role = [
	'TournamentCreator',
	'GameCreator',
	'Position',
] as const;
export type Role = { [key in typeof role[number]]: string };
export type RoleEnum = CairoCustomEnum;

// Type definition for `tournaments::components::models::tournament::TokenType` enum
export const tokenType = [
	'erc20',
	'erc721',
] as const;
export type TokenType = { 
	erc20: ERC20Data,
	erc721: ERC721Data,
};
export type TokenTypeEnum = CairoCustomEnum;

// Type definition for `tournaments::components::models::tournament::TournamentType` enum
export const tournamentType = [
	'winners',
	'participants',
] as const;
export type TournamentType = { [key in typeof tournamentType[number]]: string };
export type TournamentTypeEnum = CairoCustomEnum;

export interface SchemaType extends ISchemaType {
	evolute_duel: {
		Challenge: Challenge,
		CoinConfig: CoinConfig,
		EvltConfig: EvltConfig,
		GrndConfig: GrndConfig,
		AvailableTiles: AvailableTiles,
		Board: Board,
		Game: Game,
		GameConfig: GameConfig,
		MatchmakingState: MatchmakingState,
		Move: Move,
		PlayerMatchmaking: PlayerMatchmaking,
		Rules: Rules,
		TileCommitments: TileCommitments,
		MigrationRequest: MigrationRequest,
		Pact: Pact,
		Player: Player,
		PlayerAssignment: PlayerAssignment,
		Scoreboard: Scoreboard,
		PotentialContests: PotentialContests,
		UnionNode: UnionNode,
		Shop: Shop,
		PlayerTournamentIndex: PlayerTournamentIndex,
		TournamentChallenge: TournamentChallenge,
		TournamentPass: TournamentPass,
		TournamentSettings: TournamentSettings,
		TournamentBalance: TournamentBalance,
		Period: Period,
		GameCounter: GameCounter,
		GameMetadata: GameMetadata,
		Score: Score,
		Settings: Settings,
		SettingsCounter: SettingsCounter,
		SettingsDetails: SettingsDetails,
		TokenMetadata: TokenMetadata,
		Lifecycle: Lifecycle,
		Schedule: Schedule,
		ERC20Data: ERC20Data,
		ERC721Data: ERC721Data,
		EntryCount: EntryCount,
		EntryFee: EntryFee,
		EntryRequirement: EntryRequirement,
		Leaderboard: Leaderboard,
		Metadata: Metadata,
		NFTQualification: NFTQualification,
		PlatformMetrics: PlatformMetrics,
		Prize: Prize,
		PrizeClaim: PrizeClaim,
		PrizeMetrics: PrizeMetrics,
		QualificationEntries: QualificationEntries,
		Registration: Registration,
		Token: Token,
		Tournament: Tournament,
		TournamentConfig: TournamentConfig,
		TournamentQualification: TournamentQualification,
		TournamentTokenMetrics: TournamentTokenMetrics,
		TrophyCreation: TrophyCreation,
		TrophyProgression: TrophyProgression,
		Task: Task,
		BoardUpdated: BoardUpdated,
		CityContestDraw: CityContestDraw,
		CityContestWon: CityContestWon,
		EmergencyMigrationCancelled: EmergencyMigrationCancelled,
		ErrorEvent: ErrorEvent,
		GameCanceleFailed: GameCanceleFailed,
		GameCanceled: GameCanceled,
		GameCreateFailed: GameCreateFailed,
		GameCreated: GameCreated,
		GameFinished: GameFinished,
		GameJoinFailed: GameJoinFailed,
		GameStarted: GameStarted,
		InvalidMove: InvalidMove,
		MigrationCancelled: MigrationCancelled,
		MigrationCompleted: MigrationCompleted,
		MigrationConfirmed: MigrationConfirmed,
		MigrationError: MigrationError,
		MigrationInitiated: MigrationInitiated,
		Moved: Moved,
		NotEnoughJokers: NotEnoughJokers,
		NotYourTurn: NotYourTurn,
		PhaseStarted: PhaseStarted,
		PlayerNotInGame: PlayerNotInGame,
		PlayerSkinChangeFailed: PlayerSkinChangeFailed,
		PlayerSkinChanged: PlayerSkinChanged,
		PlayerUsernameChanged: PlayerUsernameChanged,
		RoadContestDraw: RoadContestDraw,
		RoadContestWon: RoadContestWon,
		Skiped: Skiped,
		SnapshotCreateFailed: SnapshotCreateFailed,
		SnapshotCreated: SnapshotCreated,
		TutorialCompleted: TutorialCompleted,
		EevltBurned: EevltBurned,
		EevltMinted: EevltMinted,
	},
}
export const schema: SchemaType = {
	evolute_duel: {
		Challenge: {
			duel_id: 0,
		duel_type: new CairoCustomEnum({ 
					Undefined: "",
				Regular: undefined,
				Tournament: undefined, }),
			address_a: "",
			address_b: "",
		state: new CairoCustomEnum({ 
					Null: "",
				Awaiting: undefined,
				Withdrawn: undefined,
				Refused: undefined,
				Expired: undefined,
				InProgress: undefined,
				Resolved: undefined,
				Draw: undefined, }),
			winner: 0,
		timestamps: { start: 0, end: 0, },
		},
		CoinConfig: {
			coin_address: "",
			admin_address: "",
		},
		EvltConfig: {
			config_id: 0,
			token_address: "",
			admin_address: "",
		total_supply_cap: 0,
			is_paused: false,
			staking_enabled: false,
		},
		GrndConfig: {
			config_id: 0,
			token_address: "",
			game_system_address: "",
			faucet_amount: 0,
			faucet_enabled: false,
			reward_multiplier: 0,
		daily_reward_cap: 0,
			burn_on_upgrade: false,
		},
		AvailableTiles: {
			board_id: 0,
			player: "",
			available_tiles: [0],
		},
		Board: {
			id: 0,
			available_tiles_in_deck: [0],
		top_tile: new CairoOption(CairoOptionVariant.None),
			player1: ["", PlayerSide, 0],
			player2: ["", PlayerSide, 0],
			blue_score: [0, 0],
			red_score: [0, 0],
		last_move_id: new CairoOption(CairoOptionVariant.None),
		game_state: new CairoCustomEnum({ 
					Creating: "",
				Reveal: undefined,
				Request: undefined,
				Move: undefined,
				Finished: undefined, }),
			moves_done: 0,
		commited_tile: new CairoOption(CairoOptionVariant.None),
			phase_started_at: 0,
		},
		Game: {
			player: "",
		status: new CairoCustomEnum({ 
					Finished: "",
				Created: undefined,
				Canceled: undefined,
				InProgress: undefined, }),
		board_id: new CairoOption(CairoOptionVariant.None),
		game_mode: new CairoCustomEnum({ 
					None: "",
				Tutorial: undefined,
				Ranked: undefined,
				Casual: undefined,
				Tournament: undefined, }),
		},
		GameConfig: {
		game_mode: new CairoCustomEnum({ 
					None: "",
				Tutorial: undefined,
				Ranked: undefined,
				Casual: undefined,
				Tournament: undefined, }),
			board_size: 0,
			deck_type: 0,
			initial_jokers: 0,
			time_per_phase: 0,
			auto_match: false,
			deck: [0],
			edges: [0, 0],
			joker_price: 0,
		},
		MatchmakingState: {
		game_mode: new CairoCustomEnum({ 
					None: "",
				Tutorial: undefined,
				Ranked: undefined,
				Casual: undefined,
				Tournament: undefined, }),
			tournament_id: 0,
			waiting_players: [""],
			queue_counter: 0,
		},
		Move: {
			id: 0,
		player_side: new CairoCustomEnum({ 
					None: "",
				Blue: undefined,
				Red: undefined, }),
		prev_move_id: new CairoOption(CairoOptionVariant.None),
		tile: new CairoOption(CairoOptionVariant.None),
			rotation: 0,
			col: 0,
			row: 0,
			is_joker: false,
			first_board_id: 0,
			timestamp: 0,
		top_tile: new CairoOption(CairoOptionVariant.None),
		},
		PlayerMatchmaking: {
			player: "",
		game_mode: new CairoCustomEnum({ 
					None: "",
				Tutorial: undefined,
				Ranked: undefined,
				Casual: undefined,
				Tournament: undefined, }),
			tournament_id: 0,
			timestamp: 0,
		},
		Rules: {
			id: 0,
			deck: [0],
			edges: [0, 0],
			joker_number: 0,
			joker_price: 0,
		},
		TileCommitments: {
			board_id: 0,
			player: "",
			tile_commitments: [0],
		},
		MigrationRequest: {
			guest_address: "",
			controller_address: "",
			requested_at: 0,
			expires_at: 0,
			status: 0,
		},
		Pact: {
			pair: 0,
		duel_type: new CairoCustomEnum({ 
					Undefined: "",
				Regular: undefined,
				Tournament: undefined, }),
			player_a: "",
			player_b: "",
			timestamp: 0,
		},
		Player: {
			player_id: "",
			username: 0,
			balance: 0,
			games_played: 0,
			active_skin: 0,
			role: 0,
			tutorial_completed: false,
			migration_target: "",
			migration_initiated_at: 0,
			migration_used: false,
		},
		PlayerAssignment: {
			player_address: "",
			duel_id: 0,
			pass_id: 0,
		},
		Scoreboard: {
			tournament_id: 0,
			player_address: "",
			score: 0,
		},
		PotentialContests: {
			board_id: 0,
			potential_contests: [0],
		},
		UnionNode: {
			board_id: 0,
			position: 0,
			parent: 0,
			rank: 0,
			blue_points: 0,
			red_points: 0,
			open_edges: 0,
			contested: false,
		node_type: new CairoCustomEnum({ 
					None: "",
				C: undefined,
				R: undefined,
				F: undefined, }),
		player_side: new CairoCustomEnum({ 
					None: "",
				Blue: undefined,
				Red: undefined, }),
		},
		Shop: {
			shop_id: 0,
			skin_prices: [0],
		},
		PlayerTournamentIndex: {
			player_address: "",
			tournament_id: 0,
			pass_id: 0,
		},
		TournamentChallenge: {
			challenge_id: 0,
			tournament_id: 0,
		},
		TournamentPass: {
			pass_id: 0,
			tournament_id: 0,
			player_address: "",
			entry_number: 0,
			rating: 0,
			games_played: 0,
			wins: 0,
			losses: 0,
		},
		TournamentSettings: {
			settings_id: 0,
		tournament_type: new CairoCustomEnum({ 
					Undefined: "",
				LastManStanding: undefined,
				BestOfThree: undefined, }),
		},
		TournamentBalance: {
			player_address: "",
			tournament_id: 0,
			eevlt_balance: 0,
		},
		Period: {
			start: 0,
			end: 0,
		},
		GameCounter: {
			key: 0,
			count: 0,
		},
		GameMetadata: {
			contract_address: "",
			creator_address: "",
			name: 0,
		description: "",
			developer: 0,
			publisher: 0,
			genre: 0,
		image: "",
		},
		Score: {
			game_id: 0,
			score: 0,
		},
		Settings: {
			id: 0,
			name: 0,
			value: 0,
		},
		SettingsCounter: {
			key: 0,
			count: 0,
		},
		SettingsDetails: {
			id: 0,
			name: 0,
		description: "",
			exists: false,
		},
		TokenMetadata: {
			token_id: 0,
			minted_by: "",
			player_name: 0,
			settings_id: 0,
		lifecycle: { mint: 0, start: new CairoOption(CairoOptionVariant.None), end: new CairoOption(CairoOptionVariant.None), },
		},
		Lifecycle: {
			mint: 0,
		start: new CairoOption(CairoOptionVariant.None),
		end: new CairoOption(CairoOptionVariant.None),
		},
		Schedule: {
		registration: new CairoOption(CairoOptionVariant.None),
		game: { start: 0, end: 0, },
			submission_duration: 0,
		},
		ERC20Data: {
			amount: 0,
		},
		ERC721Data: {
			id: 0,
		},
		EntryCount: {
			tournament_id: 0,
			count: 0,
		},
		EntryFee: {
			token_address: "",
			amount: 0,
			distribution: [0],
		tournament_creator_share: new CairoOption(CairoOptionVariant.None),
		game_creator_share: new CairoOption(CairoOptionVariant.None),
		},
		EntryRequirement: {
			entry_limit: 0,
		entry_requirement_type: new CairoCustomEnum({ 
					token: "",
				tournament: undefined,
				allowlist: undefined, }),
		},
		GameConfig: {
			address: "",
			settings_id: 0,
			prize_spots: 0,
		},
		Leaderboard: {
			tournament_id: 0,
			token_ids: [0],
		},
		Metadata: {
			name: 0,
		description: "",
		},
		NFTQualification: {
		token_id: 0,
		},
		PlatformMetrics: {
			key: 0,
			total_tournaments: 0,
		},
		Prize: {
			id: 0,
			tournament_id: 0,
			payout_position: 0,
			token_address: "",
		token_type: new CairoCustomEnum({ 
				erc20: { amount: 0, },
				erc721: undefined, }),
			sponsor_address: "",
		},
		PrizeClaim: {
			tournament_id: 0,
		prize_type: new CairoCustomEnum({ 
				EntryFees: new CairoCustomEnum({ 
					TournamentCreator: "",
				GameCreator: undefined,
				Position: undefined, }),
				Sponsored: undefined, }),
			claimed: false,
		},
		PrizeMetrics: {
			key: 0,
			total_prizes: 0,
		},
		QualificationEntries: {
			tournament_id: 0,
		qualification_proof: new CairoCustomEnum({ 
				Tournament: { tournament_id: 0, token_id: 0, position: 0, },
				NFT: undefined,
				Address: undefined, }),
			entry_count: 0,
		},
		Registration: {
			game_address: "",
			game_token_id: 0,
			tournament_id: 0,
			entry_number: 0,
			has_submitted: false,
		},
		Token: {
			address: "",
		name: "",
		symbol: "",
		token_type: new CairoCustomEnum({ 
				erc20: { amount: 0, },
				erc721: undefined, }),
			is_registered: false,
		},
		Tournament: {
			id: 0,
			created_at: 0,
			created_by: "",
			creator_token_id: 0,
		metadata: { name: 0, description: "", },
		schedule: { registration: new CairoOption(CairoOptionVariant.None), game: { start: 0, end: 0, }, submission_duration: 0, },
		game_config: { address: "", settings_id: 0, prize_spots: 0, },
		entry_fee: new CairoOption(CairoOptionVariant.None),
		entry_requirement: new CairoOption(CairoOptionVariant.None),
		},
		TournamentConfig: {
			key: 0,
			safe_mode: false,
			test_mode: false,
		},
		TournamentQualification: {
			tournament_id: 0,
			token_id: 0,
			position: 0,
		},
		TournamentTokenMetrics: {
			key: 0,
			total_supply: 0,
		},
		TrophyCreation: {
			id: 0,
			hidden: false,
			index: 0,
			points: 0,
			start: 0,
			end: 0,
			group: 0,
			icon: 0,
			title: 0,
		description: "",
			tasks: [{ id: 0, total: 0, description: "", }],
		data: "",
		},
		TrophyProgression: {
			player_id: 0,
			task_id: 0,
			count: 0,
			time: 0,
		},
		Task: {
			id: 0,
			total: 0,
		description: "",
		},
		BoardUpdated: {
			board_id: 0,
		top_tile: new CairoOption(CairoOptionVariant.None),
			player1: ["", PlayerSide, 0],
			player2: ["", PlayerSide, 0],
			blue_score: [0, 0],
			red_score: [0, 0],
		last_move_id: new CairoOption(CairoOptionVariant.None),
			moves_done: 0,
		game_state: new CairoCustomEnum({ 
					Creating: "",
				Reveal: undefined,
				Request: undefined,
				Move: undefined,
				Finished: undefined, }),
		},
		CityContestDraw: {
			board_id: 0,
			root: 0,
			red_points: 0,
			blue_points: 0,
		},
		CityContestWon: {
			board_id: 0,
			root: 0,
		winner: new CairoCustomEnum({ 
					None: "",
				Blue: undefined,
				Red: undefined, }),
			red_points: 0,
			blue_points: 0,
		},
		EmergencyMigrationCancelled: {
			guest_address: "",
			admin_address: "",
		reason: "",
		},
		ErrorEvent: {
			player_address: "",
			name: 0,
		message: "",
		},
		GameCanceleFailed: {
			host_player: "",
		status: new CairoCustomEnum({ 
					Finished: "",
				Created: undefined,
				Canceled: undefined,
				InProgress: undefined, }),
		},
		GameCanceled: {
			host_player: "",
		status: new CairoCustomEnum({ 
					Finished: "",
				Created: undefined,
				Canceled: undefined,
				InProgress: undefined, }),
		},
		GameCreateFailed: {
			host_player: "",
		status: new CairoCustomEnum({ 
					Finished: "",
				Created: undefined,
				Canceled: undefined,
				InProgress: undefined, }),
		},
		GameCreated: {
			host_player: "",
		status: new CairoCustomEnum({ 
					Finished: "",
				Created: undefined,
				Canceled: undefined,
				InProgress: undefined, }),
		},
		GameFinished: {
			player: "",
			board_id: 0,
		},
		GameJoinFailed: {
			host_player: "",
			guest_player: "",
		host_game_status: new CairoCustomEnum({ 
					Finished: "",
				Created: undefined,
				Canceled: undefined,
				InProgress: undefined, }),
		guest_game_status: new CairoCustomEnum({ 
					Finished: "",
				Created: undefined,
				Canceled: undefined,
				InProgress: undefined, }),
		},
		GameStarted: {
			host_player: "",
			guest_player: "",
			board_id: 0,
		},
		InvalidMove: {
			player: "",
		prev_move_id: new CairoOption(CairoOptionVariant.None),
		tile: new CairoOption(CairoOptionVariant.None),
			rotation: 0,
			col: 0,
			row: 0,
			is_joker: false,
			board_id: 0,
		},
		MigrationCancelled: {
			guest_address: "",
			controller_address: "",
			cancelled_at: 0,
		},
		MigrationCompleted: {
			guest_address: "",
			controller_address: "",
			balance_transferred: 0,
			games_transferred: 0,
		},
		MigrationConfirmed: {
			guest_address: "",
			controller_address: "",
			confirmed_at: 0,
		},
		MigrationError: {
			guest_address: "",
			controller_address: "",
			status: 0,
		error_context: "",
		error_message: "",
		},
		MigrationInitiated: {
			guest_address: "",
			controller_address: "",
			expires_at: 0,
		},
		Moved: {
			move_id: 0,
			player: "",
		prev_move_id: new CairoOption(CairoOptionVariant.None),
		tile: new CairoOption(CairoOptionVariant.None),
			rotation: 0,
			col: 0,
			row: 0,
			is_joker: false,
			board_id: 0,
			timestamp: 0,
		},
		NotEnoughJokers: {
			player_id: "",
			board_id: 0,
		},
		NotYourTurn: {
			player_id: "",
			board_id: 0,
		},
		PhaseStarted: {
			board_id: 0,
			phase: 0,
		top_tile: new CairoOption(CairoOptionVariant.None),
		commited_tile: new CairoOption(CairoOptionVariant.None),
			started_at: 0,
		},
		PlayerNotInGame: {
			player_id: "",
			board_id: 0,
		},
		PlayerSkinChangeFailed: {
			player_id: "",
			new_skin: 0,
			skin_price: 0,
			balance: 0,
		},
		PlayerSkinChanged: {
			player_id: "",
			new_skin: 0,
		},
		PlayerUsernameChanged: {
			player_id: "",
			new_username: 0,
		},
		RoadContestDraw: {
			board_id: 0,
			root: 0,
			red_points: 0,
			blue_points: 0,
		},
		RoadContestWon: {
			board_id: 0,
			root: 0,
		winner: new CairoCustomEnum({ 
					None: "",
				Blue: undefined,
				Red: undefined, }),
			red_points: 0,
			blue_points: 0,
		},
		Skiped: {
			move_id: 0,
			player: "",
		prev_move_id: new CairoOption(CairoOptionVariant.None),
			board_id: 0,
			timestamp: 0,
		},
		SnapshotCreateFailed: {
			player: "",
			board_id: 0,
		board_game_state: new CairoCustomEnum({ 
					Creating: "",
				Reveal: undefined,
				Request: undefined,
				Move: undefined,
				Finished: undefined, }),
			move_number: 0,
		},
		SnapshotCreated: {
			snapshot_id: 0,
			player: "",
			board_id: 0,
			move_number: 0,
		},
		TutorialCompleted: {
			player_id: "",
			completed_at: 0,
		},
		EevltBurned: {
			player_address: "",
			tournament_id: 0,
			amount: 0,
		},
		EevltMinted: {
			player_address: "",
			tournament_id: 0,
			amount: 0,
		},
	},
};
export enum ModelsMapping {
	Challenge = 'evolute_duel-Challenge',
	DuelType = 'evolute_duel-DuelType',
	CoinConfig = 'evolute_duel-CoinConfig',
	EvltConfig = 'evolute_duel-EvltConfig',
	GrndConfig = 'evolute_duel-GrndConfig',
	AvailableTiles = 'evolute_duel-AvailableTiles',
	Board = 'evolute_duel-Board',
	Game = 'evolute_duel-Game',
	GameConfig = 'evolute_duel-GameConfig',
	MatchmakingState = 'evolute_duel-MatchmakingState',
	Move = 'evolute_duel-Move',
	PlayerMatchmaking = 'evolute_duel-PlayerMatchmaking',
	Rules = 'evolute_duel-Rules',
	TileCommitments = 'evolute_duel-TileCommitments',
	MigrationRequest = 'evolute_duel-MigrationRequest',
	Pact = 'evolute_duel-Pact',
	Player = 'evolute_duel-Player',
	PlayerAssignment = 'evolute_duel-PlayerAssignment',
	Scoreboard = 'evolute_duel-Scoreboard',
	PotentialContests = 'evolute_duel-PotentialContests',
	UnionNode = 'evolute_duel-UnionNode',
	Shop = 'evolute_duel-Shop',
	PlayerTournamentIndex = 'evolute_duel-PlayerTournamentIndex',
	TournamentChallenge = 'evolute_duel-TournamentChallenge',
	TournamentPass = 'evolute_duel-TournamentPass',
	TournamentSettings = 'evolute_duel-TournamentSettings',
	TournamentType = 'evolute_duel-TournamentType',
	TournamentBalance = 'evolute_duel-TournamentBalance',
	ChallengeState = 'evolute_duel-ChallengeState',
	GameMode = 'evolute_duel-GameMode',
	GameState = 'evolute_duel-GameState',
	GameStatus = 'evolute_duel-GameStatus',
	PlayerSide = 'evolute_duel-PlayerSide',
	TEdge = 'evolute_duel-TEdge',
	Period = 'evolute_duel-Period',
	GameCounter = 'tournaments-GameCounter',
	GameMetadata = 'tournaments-GameMetadata',
	Score = 'tournaments-Score',
	Settings = 'tournaments-Settings',
	SettingsCounter = 'tournaments-SettingsCounter',
	SettingsDetails = 'tournaments-SettingsDetails',
	TokenMetadata = 'tournaments-TokenMetadata',
	Lifecycle = 'tournaments-Lifecycle',
	Period = 'tournaments-Period',
	Schedule = 'tournaments-Schedule',
	ERC20Data = 'tournaments-ERC20Data',
	ERC721Data = 'tournaments-ERC721Data',
	EntryCount = 'tournaments-EntryCount',
	EntryFee = 'tournaments-EntryFee',
	EntryRequirement = 'tournaments-EntryRequirement',
	EntryRequirementType = 'tournaments-EntryRequirementType',
	GameConfig = 'tournaments-GameConfig',
	Leaderboard = 'tournaments-Leaderboard',
	Metadata = 'tournaments-Metadata',
	NFTQualification = 'tournaments-NFTQualification',
	PlatformMetrics = 'tournaments-PlatformMetrics',
	Prize = 'tournaments-Prize',
	PrizeClaim = 'tournaments-PrizeClaim',
	PrizeMetrics = 'tournaments-PrizeMetrics',
	PrizeType = 'tournaments-PrizeType',
	QualificationEntries = 'tournaments-QualificationEntries',
	QualificationProof = 'tournaments-QualificationProof',
	Registration = 'tournaments-Registration',
	Role = 'tournaments-Role',
	Token = 'tournaments-Token',
	TokenType = 'tournaments-TokenType',
	Tournament = 'tournaments-Tournament',
	TournamentConfig = 'tournaments-TournamentConfig',
	TournamentQualification = 'tournaments-TournamentQualification',
	TournamentTokenMetrics = 'tournaments-TournamentTokenMetrics',
	TournamentType = 'tournaments-TournamentType',
	TrophyCreation = 'achievement-TrophyCreation',
	TrophyProgression = 'achievement-TrophyProgression',
	Task = 'achievement-Task',
	BoardUpdated = 'evolute_duel-BoardUpdated',
	CityContestDraw = 'evolute_duel-CityContestDraw',
	CityContestWon = 'evolute_duel-CityContestWon',
	EmergencyMigrationCancelled = 'evolute_duel-EmergencyMigrationCancelled',
	ErrorEvent = 'evolute_duel-ErrorEvent',
	GameCanceleFailed = 'evolute_duel-GameCanceleFailed',
	GameCanceled = 'evolute_duel-GameCanceled',
	GameCreateFailed = 'evolute_duel-GameCreateFailed',
	GameCreated = 'evolute_duel-GameCreated',
	GameFinished = 'evolute_duel-GameFinished',
	GameJoinFailed = 'evolute_duel-GameJoinFailed',
	GameStarted = 'evolute_duel-GameStarted',
	InvalidMove = 'evolute_duel-InvalidMove',
	MigrationCancelled = 'evolute_duel-MigrationCancelled',
	MigrationCompleted = 'evolute_duel-MigrationCompleted',
	MigrationConfirmed = 'evolute_duel-MigrationConfirmed',
	MigrationError = 'evolute_duel-MigrationError',
	MigrationInitiated = 'evolute_duel-MigrationInitiated',
	Moved = 'evolute_duel-Moved',
	NotEnoughJokers = 'evolute_duel-NotEnoughJokers',
	NotYourTurn = 'evolute_duel-NotYourTurn',
	PhaseStarted = 'evolute_duel-PhaseStarted',
	PlayerNotInGame = 'evolute_duel-PlayerNotInGame',
	PlayerSkinChangeFailed = 'evolute_duel-PlayerSkinChangeFailed',
	PlayerSkinChanged = 'evolute_duel-PlayerSkinChanged',
	PlayerUsernameChanged = 'evolute_duel-PlayerUsernameChanged',
	RoadContestDraw = 'evolute_duel-RoadContestDraw',
	RoadContestWon = 'evolute_duel-RoadContestWon',
	Skiped = 'evolute_duel-Skiped',
	SnapshotCreateFailed = 'evolute_duel-SnapshotCreateFailed',
	SnapshotCreated = 'evolute_duel-SnapshotCreated',
	TutorialCompleted = 'evolute_duel-TutorialCompleted',
	EevltBurned = 'evolute_duel-EevltBurned',
	EevltMinted = 'evolute_duel-EevltMinted',
}