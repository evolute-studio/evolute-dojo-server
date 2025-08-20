import type { SchemaType as ISchemaType } from "@dojoengine/sdk";

import { CairoCustomEnum, CairoOption, CairoOptionVariant, BigNumberish } from 'starknet';

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

// Type definition for `evolute_duel::types::packing::GameMode` enum
export const gameMode = [
	'None',
	'Tutorial',
	'Ranked',
	'Casual',
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

export interface SchemaType extends ISchemaType {
	evolute_duel: {
		AvailableTiles: AvailableTiles,
		Board: Board,
		Game: Game,
		GameConfig: GameConfig,
		Move: Move,
		Rules: Rules,
		TileCommitments: TileCommitments,
		MigrationRequest: MigrationRequest,
		Player: Player,
		PotentialContests: PotentialContests,
		UnionNode: UnionNode,
		Shop: Shop,
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
	},
}
export const schema: SchemaType = {
	evolute_duel: {
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
				Casual: undefined, }),
		},
		GameConfig: {
		game_mode: new CairoCustomEnum({ 
					None: "",
				Tutorial: undefined,
				Ranked: undefined,
				Casual: undefined, }),
			board_size: 0,
			deck_type: 0,
			initial_jokers: 0,
			time_per_phase: 0,
			auto_match: false,
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
	},
};
export enum ModelsMapping {
	AvailableTiles = 'evolute_duel-AvailableTiles',
	Board = 'evolute_duel-Board',
	Game = 'evolute_duel-Game',
	GameConfig = 'evolute_duel-GameConfig',
	Move = 'evolute_duel-Move',
	Rules = 'evolute_duel-Rules',
	TileCommitments = 'evolute_duel-TileCommitments',
	MigrationRequest = 'evolute_duel-MigrationRequest',
	Player = 'evolute_duel-Player',
	PotentialContests = 'evolute_duel-PotentialContests',
	UnionNode = 'evolute_duel-UnionNode',
	Shop = 'evolute_duel-Shop',
	GameMode = 'evolute_duel-GameMode',
	GameState = 'evolute_duel-GameState',
	GameStatus = 'evolute_duel-GameStatus',
	PlayerSide = 'evolute_duel-PlayerSide',
	TEdge = 'evolute_duel-TEdge',
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
}