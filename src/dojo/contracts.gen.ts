import { DojoProvider, DojoCall } from "@dojoengine/core";
import { Account, AccountInterface, BigNumberish, CairoOption, CairoCustomEnum } from "starknet";
import * as models from "./models.gen";

export function setupWorld(provider: DojoProvider) {

	const build_account_migration_cancelMigration_calldata = (): DojoCall => {
		return {
			contractName: "account_migration",
			entrypoint: "cancel_migration",
			calldata: [],
		};
	};

	const account_migration_cancelMigration = async (snAccount: Account | AccountInterface) => {
		try {
			return await provider.execute(
				snAccount,
				build_account_migration_cancelMigration_calldata(),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_account_migration_confirmMigration_calldata = (guestAddress: string): DojoCall => {
		return {
			contractName: "account_migration",
			entrypoint: "confirm_migration",
			calldata: [guestAddress],
		};
	};

	const account_migration_confirmMigration = async (snAccount: Account | AccountInterface, guestAddress: string) => {
		try {
			return await provider.execute(
				snAccount,
				build_account_migration_confirmMigration_calldata(guestAddress),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_account_migration_emergencyCancelMigration_calldata = (guestAddress: string): DojoCall => {
		return {
			contractName: "account_migration",
			entrypoint: "emergency_cancel_migration",
			calldata: [guestAddress],
		};
	};

	const account_migration_emergencyCancelMigration = async (snAccount: Account | AccountInterface, guestAddress: string) => {
		try {
			return await provider.execute(
				snAccount,
				build_account_migration_emergencyCancelMigration_calldata(guestAddress),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_account_migration_executeMigration_calldata = (guestAddress: string): DojoCall => {
		return {
			contractName: "account_migration",
			entrypoint: "execute_migration",
			calldata: [guestAddress],
		};
	};

	const account_migration_executeMigration = async (snAccount: Account | AccountInterface, guestAddress: string) => {
		try {
			return await provider.execute(
				snAccount,
				build_account_migration_executeMigration_calldata(guestAddress),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_account_migration_initiateMigration_calldata = (targetController: string): DojoCall => {
		return {
			contractName: "account_migration",
			entrypoint: "initiate_migration",
			calldata: [targetController],
		};
	};

	const account_migration_initiateMigration = async (snAccount: Account | AccountInterface, targetController: string) => {
		try {
			return await provider.execute(
				snAccount,
				build_account_migration_initiateMigration_calldata(targetController),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_account_migration_owner_calldata = (): DojoCall => {
		return {
			contractName: "account_migration",
			entrypoint: "owner",
			calldata: [],
		};
	};

	const account_migration_owner = async () => {
		try {
			return await provider.call("evolute_duel", build_account_migration_owner_calldata());
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_account_migration_renounceOwnership_calldata = (): DojoCall => {
		return {
			contractName: "account_migration",
			entrypoint: "renounceOwnership",
			calldata: [],
		};
	};

	const account_migration_renounceOwnership = async (snAccount: Account | AccountInterface) => {
		try {
			return await provider.execute(
				snAccount,
				build_account_migration_renounceOwnership_calldata(),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_account_migration_transferOwnership_calldata = (newOwner: string): DojoCall => {
		return {
			contractName: "account_migration",
			entrypoint: "transferOwnership",
			calldata: [newOwner],
		};
	};

	const account_migration_transferOwnership = async (snAccount: Account | AccountInterface, newOwner: string) => {
		try {
			return await provider.execute(
				snAccount,
				build_account_migration_transferOwnership_calldata(newOwner),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_game_cancelGame_calldata = (): DojoCall => {
		return {
			contractName: "game",
			entrypoint: "cancel_game",
			calldata: [],
		};
	};

	const game_cancelGame = async (snAccount: Account | AccountInterface) => {
		try {
			return await provider.execute(
				snAccount,
				build_game_cancelGame_calldata(),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_game_commitTiles_calldata = (commitments: Array<BigNumberish>): DojoCall => {
		return {
			contractName: "game",
			entrypoint: "commit_tiles",
			calldata: [commitments],
		};
	};

	const game_commitTiles = async (snAccount: Account | AccountInterface, commitments: Array<BigNumberish>) => {
		try {
			return await provider.execute(
				snAccount,
				build_game_commitTiles_calldata(commitments),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_game_createGame_calldata = (): DojoCall => {
		return {
			contractName: "game",
			entrypoint: "create_game",
			calldata: [],
		};
	};

	const game_createGame = async (snAccount: Account | AccountInterface) => {
		try {

			console.log("Call game_createGame");
			console.log("Account:", snAccount);
			console.log("Provider:", provider);
			console.log("Calldata:", build_game_createGame_calldata());

			return await provider.execute(
				snAccount,
				build_game_createGame_calldata(),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_game_finishGame_calldata = (boardId: BigNumberish): DojoCall => {
		return {
			contractName: "game",
			entrypoint: "finish_game",
			calldata: [boardId],
		};
	};

	const game_finishGame = async (snAccount: Account | AccountInterface, boardId: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_game_finishGame_calldata(boardId),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_game_joinGame_calldata = (hostPlayer: string): DojoCall => {
		return {
			contractName: "game",
			entrypoint: "join_game",
			calldata: [hostPlayer],
		};
	};

	const game_joinGame = async (snAccount: Account | AccountInterface, hostPlayer: string) => {
		try {
			return await provider.execute(
				snAccount,
				build_game_joinGame_calldata(hostPlayer),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_game_makeMove_calldata = (jokerTile: CairoOption<BigNumberish>, rotation: BigNumberish, col: BigNumberish, row: BigNumberish): DojoCall => {
		return {
			contractName: "game",
			entrypoint: "make_move",
			calldata: [jokerTile, rotation, col, row],
		};
	};

	const game_makeMove = async (snAccount: Account | AccountInterface, jokerTile: CairoOption<BigNumberish>, rotation: BigNumberish, col: BigNumberish, row: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_game_makeMove_calldata(jokerTile, rotation, col, row),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_game_requestNextTile_calldata = (tileIndex: BigNumberish, nonce: BigNumberish, c: BigNumberish): DojoCall => {
		return {
			contractName: "game",
			entrypoint: "request_next_tile",
			calldata: [tileIndex, nonce, c],
		};
	};

	const game_requestNextTile = async (snAccount: Account | AccountInterface, tileIndex: BigNumberish, nonce: BigNumberish, c: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_game_requestNextTile_calldata(tileIndex, nonce, c),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_game_revealTile_calldata = (tileIndex: BigNumberish, nonce: BigNumberish, c: BigNumberish): DojoCall => {
		return {
			contractName: "game",
			entrypoint: "reveal_tile",
			calldata: [tileIndex, nonce, c],
		};
	};

	const game_revealTile = async (snAccount: Account | AccountInterface, tileIndex: BigNumberish, nonce: BigNumberish, c: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_game_revealTile_calldata(tileIndex, nonce, c),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_game_skipMove_calldata = (): DojoCall => {
		return {
			contractName: "game",
			entrypoint: "skip_move",
			calldata: [],
		};
	};

	const game_skipMove = async (snAccount: Account | AccountInterface) => {
		try {
			return await provider.execute(
				snAccount,
				build_game_skipMove_calldata(),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_player_profile_actions_becomeBot_calldata = (): DojoCall => {
		return {
			contractName: "player_profile_actions",
			entrypoint: "become_bot",
			calldata: [],
		};
	};

	const player_profile_actions_becomeBot = async (snAccount: Account | AccountInterface) => {
		try {
			return await provider.execute(
				snAccount,
				build_player_profile_actions_becomeBot_calldata(),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_player_profile_actions_becomeController_calldata = (): DojoCall => {
		return {
			contractName: "player_profile_actions",
			entrypoint: "become_controller",
			calldata: [],
		};
	};

	const player_profile_actions_becomeController = async (snAccount: Account | AccountInterface) => {
		try {
			return await provider.execute(
				snAccount,
				build_player_profile_actions_becomeController_calldata(),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_player_profile_actions_changeSkin_calldata = (skinId: BigNumberish): DojoCall => {
		return {
			contractName: "player_profile_actions",
			entrypoint: "change_skin",
			calldata: [skinId],
		};
	};

	const player_profile_actions_changeSkin = async (snAccount: Account | AccountInterface, skinId: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_player_profile_actions_changeSkin_calldata(skinId),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_player_profile_actions_changeUsername_calldata = (newUsername: BigNumberish): DojoCall => {
		return {
			contractName: "player_profile_actions",
			entrypoint: "change_username",
			calldata: [newUsername],
		};
	};

	const player_profile_actions_changeUsername = async (snAccount: Account | AccountInterface, newUsername: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_player_profile_actions_changeUsername_calldata(newUsername),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_player_profile_actions_owner_calldata = (): DojoCall => {
		return {
			contractName: "player_profile_actions",
			entrypoint: "owner",
			calldata: [],
		};
	};

	const player_profile_actions_owner = async () => {
		try {
			return await provider.call("evolute_duel", build_player_profile_actions_owner_calldata());
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_player_profile_actions_renounceOwnership_calldata = (): DojoCall => {
		return {
			contractName: "player_profile_actions",
			entrypoint: "renounceOwnership",
			calldata: [],
		};
	};

	const player_profile_actions_renounceOwnership = async (snAccount: Account | AccountInterface) => {
		try {
			return await provider.execute(
				snAccount,
				build_player_profile_actions_renounceOwnership_calldata(),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_player_profile_actions_setPlayer_calldata = (playerId: string, username: BigNumberish, balance: BigNumberish, gamesPlayed: BigNumberish, activeSkin: BigNumberish, role: BigNumberish): DojoCall => {
		return {
			contractName: "player_profile_actions",
			entrypoint: "set_player",
			calldata: [playerId, username, balance, gamesPlayed, activeSkin, role],
		};
	};

	const player_profile_actions_setPlayer = async (snAccount: Account | AccountInterface, playerId: string, username: BigNumberish, balance: BigNumberish, gamesPlayed: BigNumberish, activeSkin: BigNumberish, role: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_player_profile_actions_setPlayer_calldata(playerId, username, balance, gamesPlayed, activeSkin, role),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_player_profile_actions_transferOwnership_calldata = (newOwner: string): DojoCall => {
		return {
			contractName: "player_profile_actions",
			entrypoint: "transferOwnership",
			calldata: [newOwner],
		};
	};

	const player_profile_actions_transferOwnership = async (snAccount: Account | AccountInterface, newOwner: string) => {
		try {
			return await provider.execute(
				snAccount,
				build_player_profile_actions_transferOwnership_calldata(newOwner),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_tutorial_cancelGame_calldata = (): DojoCall => {
		return {
			contractName: "tutorial",
			entrypoint: "cancel_game",
			calldata: [],
		};
	};

	const tutorial_cancelGame = async (snAccount: Account | AccountInterface) => {
		try {
			return await provider.execute(
				snAccount,
				build_tutorial_cancelGame_calldata(),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_tutorial_createTutorialGame_calldata = (botAddress: string): DojoCall => {
		return {
			contractName: "tutorial",
			entrypoint: "create_tutorial_game",
			calldata: [botAddress],
		};
	};

	const tutorial_createTutorialGame = async (snAccount: Account | AccountInterface, botAddress: string) => {
		try {
			return await provider.execute(
				snAccount,
				build_tutorial_createTutorialGame_calldata(botAddress),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_tutorial_makeMove_calldata = (jokerTile: CairoOption<BigNumberish>, rotation: BigNumberish, col: BigNumberish, row: BigNumberish): DojoCall => {
		return {
			contractName: "tutorial",
			entrypoint: "make_move",
			calldata: [jokerTile, rotation, col, row],
		};
	};

	const tutorial_makeMove = async (snAccount: Account | AccountInterface, jokerTile: CairoOption<BigNumberish>, rotation: BigNumberish, col: BigNumberish, row: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_tutorial_makeMove_calldata(jokerTile, rotation, col, row),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_tutorial_skipMove_calldata = (): DojoCall => {
		return {
			contractName: "tutorial",
			entrypoint: "skip_move",
			calldata: [],
		};
	};

	const tutorial_skipMove = async (snAccount: Account | AccountInterface) => {
		try {
			return await provider.execute(
				snAccount,
				build_tutorial_skipMove_calldata(),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};



	return {
		account_migration: {
			cancelMigration: account_migration_cancelMigration,
			buildCancelMigrationCalldata: build_account_migration_cancelMigration_calldata,
			confirmMigration: account_migration_confirmMigration,
			buildConfirmMigrationCalldata: build_account_migration_confirmMigration_calldata,
			emergencyCancelMigration: account_migration_emergencyCancelMigration,
			buildEmergencyCancelMigrationCalldata: build_account_migration_emergencyCancelMigration_calldata,
			executeMigration: account_migration_executeMigration,
			buildExecuteMigrationCalldata: build_account_migration_executeMigration_calldata,
			initiateMigration: account_migration_initiateMigration,
			buildInitiateMigrationCalldata: build_account_migration_initiateMigration_calldata,
			owner: account_migration_owner,
			buildOwnerCalldata: build_account_migration_owner_calldata,
			renounceOwnership: account_migration_renounceOwnership,
			buildRenounceOwnershipCalldata: build_account_migration_renounceOwnership_calldata,
			transferOwnership: account_migration_transferOwnership,
			buildTransferOwnershipCalldata: build_account_migration_transferOwnership_calldata,
		},
		game: {
			cancelGame: game_cancelGame,
			buildCancelGameCalldata: build_game_cancelGame_calldata,
			commitTiles: game_commitTiles,
			buildCommitTilesCalldata: build_game_commitTiles_calldata,
			createGame: game_createGame,
			buildCreateGameCalldata: build_game_createGame_calldata,
			finishGame: game_finishGame,
			buildFinishGameCalldata: build_game_finishGame_calldata,
			joinGame: game_joinGame,
			buildJoinGameCalldata: build_game_joinGame_calldata,
			makeMove: game_makeMove,
			buildMakeMoveCalldata: build_game_makeMove_calldata,
			requestNextTile: game_requestNextTile,
			buildRequestNextTileCalldata: build_game_requestNextTile_calldata,
			revealTile: game_revealTile,
			buildRevealTileCalldata: build_game_revealTile_calldata,
			skipMove: game_skipMove,
			buildSkipMoveCalldata: build_game_skipMove_calldata,
		},
		player_profile_actions: {
			becomeBot: player_profile_actions_becomeBot,
			buildBecomeBotCalldata: build_player_profile_actions_becomeBot_calldata,
			becomeController: player_profile_actions_becomeController,
			buildBecomeControllerCalldata: build_player_profile_actions_becomeController_calldata,
			changeSkin: player_profile_actions_changeSkin,
			buildChangeSkinCalldata: build_player_profile_actions_changeSkin_calldata,
			changeUsername: player_profile_actions_changeUsername,
			buildChangeUsernameCalldata: build_player_profile_actions_changeUsername_calldata,
			owner: player_profile_actions_owner,
			buildOwnerCalldata: build_player_profile_actions_owner_calldata,
			renounceOwnership: player_profile_actions_renounceOwnership,
			buildRenounceOwnershipCalldata: build_player_profile_actions_renounceOwnership_calldata,
			setPlayer: player_profile_actions_setPlayer,
			buildSetPlayerCalldata: build_player_profile_actions_setPlayer_calldata,
			transferOwnership: player_profile_actions_transferOwnership,
			buildTransferOwnershipCalldata: build_player_profile_actions_transferOwnership_calldata,
		},
		tutorial: {
			cancelGame: tutorial_cancelGame,
			buildCancelGameCalldata: build_tutorial_cancelGame_calldata,
			createTutorialGame: tutorial_createTutorialGame,
			buildCreateTutorialGameCalldata: build_tutorial_createTutorialGame_calldata,
			makeMove: tutorial_makeMove,
			buildMakeMoveCalldata: build_tutorial_makeMove_calldata,
			skipMove: tutorial_skipMove,
			buildSkipMoveCalldata: build_tutorial_skipMove_calldata,
		},
	};
}