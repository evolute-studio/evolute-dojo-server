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

	const build_evlt_token_allowance_calldata = (owner: string, spender: string): DojoCall => {
		return {
			contractName: "evlt_token",
			entrypoint: "allowance",
			calldata: [owner, spender],
		};
	};

	const evlt_token_allowance = async (owner: string, spender: string) => {
		try {
			return await provider.call("evolute_duel", build_evlt_token_allowance_calldata(owner, spender));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_evlt_token_approve_calldata = (spender: string, amount: BigNumberish): DojoCall => {
		return {
			contractName: "evlt_token",
			entrypoint: "approve",
			calldata: [spender, amount],
		};
	};

	const evlt_token_approve = async (snAccount: Account | AccountInterface, spender: string, amount: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_evlt_token_approve_calldata(spender, amount),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_evlt_token_balanceOf_calldata = (account: string): DojoCall => {
		return {
			contractName: "evlt_token",
			entrypoint: "balanceOf",
			calldata: [account],
		};
	};

	const evlt_token_balanceOf = async (account: string) => {
		try {
			return await provider.call("evolute_duel", build_evlt_token_balanceOf_calldata(account));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_evlt_token_burn_calldata = (from: string, amount: BigNumberish): DojoCall => {
		return {
			contractName: "evlt_token",
			entrypoint: "burn",
			calldata: [from, amount],
		};
	};

	const evlt_token_burn = async (snAccount: Account | AccountInterface, from: string, amount: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_evlt_token_burn_calldata(from, amount),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_evlt_token_decimals_calldata = (): DojoCall => {
		return {
			contractName: "evlt_token",
			entrypoint: "decimals",
			calldata: [],
		};
	};

	const evlt_token_decimals = async () => {
		try {
			return await provider.call("evolute_duel", build_evlt_token_decimals_calldata());
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_evlt_token_getRoleAdmin_calldata = (role: BigNumberish): DojoCall => {
		return {
			contractName: "evlt_token",
			entrypoint: "getRoleAdmin",
			calldata: [role],
		};
	};

	const evlt_token_getRoleAdmin = async (role: BigNumberish) => {
		try {
			return await provider.call("evolute_duel", build_evlt_token_getRoleAdmin_calldata(role));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_evlt_token_grantRole_calldata = (role: BigNumberish, account: string): DojoCall => {
		return {
			contractName: "evlt_token",
			entrypoint: "grantRole",
			calldata: [role, account],
		};
	};

	const evlt_token_grantRole = async (snAccount: Account | AccountInterface, role: BigNumberish, account: string) => {
		try {
			return await provider.execute(
				snAccount,
				build_evlt_token_grantRole_calldata(role, account),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_evlt_token_hasRole_calldata = (role: BigNumberish, account: string): DojoCall => {
		return {
			contractName: "evlt_token",
			entrypoint: "hasRole",
			calldata: [role, account],
		};
	};

	const evlt_token_hasRole = async (role: BigNumberish, account: string) => {
		try {
			return await provider.call("evolute_duel", build_evlt_token_hasRole_calldata(role, account));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_evlt_token_mint_calldata = (recipient: string, amount: BigNumberish): DojoCall => {
		return {
			contractName: "evlt_token",
			entrypoint: "mint",
			calldata: [recipient, amount],
		};
	};

	const evlt_token_mint = async (snAccount: Account | AccountInterface, recipient: string, amount: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_evlt_token_mint_calldata(recipient, amount),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_evlt_token_name_calldata = (): DojoCall => {
		return {
			contractName: "evlt_token",
			entrypoint: "name",
			calldata: [],
		};
	};

	const evlt_token_name = async () => {
		try {
			return await provider.call("evolute_duel", build_evlt_token_name_calldata());
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_evlt_token_renounceRole_calldata = (role: BigNumberish, account: string): DojoCall => {
		return {
			contractName: "evlt_token",
			entrypoint: "renounceRole",
			calldata: [role, account],
		};
	};

	const evlt_token_renounceRole = async (snAccount: Account | AccountInterface, role: BigNumberish, account: string) => {
		try {
			return await provider.execute(
				snAccount,
				build_evlt_token_renounceRole_calldata(role, account),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_evlt_token_revokeRole_calldata = (role: BigNumberish, account: string): DojoCall => {
		return {
			contractName: "evlt_token",
			entrypoint: "revokeRole",
			calldata: [role, account],
		};
	};

	const evlt_token_revokeRole = async (snAccount: Account | AccountInterface, role: BigNumberish, account: string) => {
		try {
			return await provider.execute(
				snAccount,
				build_evlt_token_revokeRole_calldata(role, account),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_evlt_token_setBurner_calldata = (burnerAddress: string): DojoCall => {
		return {
			contractName: "evlt_token",
			entrypoint: "set_burner",
			calldata: [burnerAddress],
		};
	};

	const evlt_token_setBurner = async (snAccount: Account | AccountInterface, burnerAddress: string) => {
		try {
			return await provider.execute(
				snAccount,
				build_evlt_token_setBurner_calldata(burnerAddress),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_evlt_token_setMinter_calldata = (minterAddress: string): DojoCall => {
		return {
			contractName: "evlt_token",
			entrypoint: "set_minter",
			calldata: [minterAddress],
		};
	};

	const evlt_token_setMinter = async (snAccount: Account | AccountInterface, minterAddress: string) => {
		try {
			return await provider.execute(
				snAccount,
				build_evlt_token_setMinter_calldata(minterAddress),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_evlt_token_setTransferAllowed_calldata = (allowedAddress: string): DojoCall => {
		return {
			contractName: "evlt_token",
			entrypoint: "set_transfer_allowed",
			calldata: [allowedAddress],
		};
	};

	const evlt_token_setTransferAllowed = async (snAccount: Account | AccountInterface, allowedAddress: string) => {
		try {
			return await provider.execute(
				snAccount,
				build_evlt_token_setTransferAllowed_calldata(allowedAddress),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_evlt_token_supportsInterface_calldata = (interfaceId: BigNumberish): DojoCall => {
		return {
			contractName: "evlt_token",
			entrypoint: "supports_interface",
			calldata: [interfaceId],
		};
	};

	const evlt_token_supportsInterface = async (interfaceId: BigNumberish) => {
		try {
			return await provider.call("evolute_duel", build_evlt_token_supportsInterface_calldata(interfaceId));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_evlt_token_symbol_calldata = (): DojoCall => {
		return {
			contractName: "evlt_token",
			entrypoint: "symbol",
			calldata: [],
		};
	};

	const evlt_token_symbol = async () => {
		try {
			return await provider.call("evolute_duel", build_evlt_token_symbol_calldata());
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_evlt_token_totalSupply_calldata = (): DojoCall => {
		return {
			contractName: "evlt_token",
			entrypoint: "totalSupply",
			calldata: [],
		};
	};

	const evlt_token_totalSupply = async () => {
		try {
			return await provider.call("evolute_duel", build_evlt_token_totalSupply_calldata());
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_evlt_token_transfer_calldata = (recipient: string, amount: BigNumberish): DojoCall => {
		return {
			contractName: "evlt_token",
			entrypoint: "transfer",
			calldata: [recipient, amount],
		};
	};

	const evlt_token_transfer = async (snAccount: Account | AccountInterface, recipient: string, amount: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_evlt_token_transfer_calldata(recipient, amount),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_evlt_token_transferFrom_calldata = (sender: string, recipient: string, amount: BigNumberish): DojoCall => {
		return {
			contractName: "evlt_token",
			entrypoint: "transferFrom",
			calldata: [sender, recipient, amount],
		};
	};

	const evlt_token_transferFrom = async (snAccount: Account | AccountInterface, sender: string, recipient: string, amount: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_evlt_token_transferFrom_calldata(sender, recipient, amount),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_evlt_topup_getRoleAdmin_calldata = (role: BigNumberish): DojoCall => {
		return {
			contractName: "evlt_topup",
			entrypoint: "getRoleAdmin",
			calldata: [role],
		};
	};

	const evlt_topup_getRoleAdmin = async (role: BigNumberish) => {
		try {
			return await provider.call("evolute_duel", build_evlt_topup_getRoleAdmin_calldata(role));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_evlt_topup_getTopupHistory_calldata = (user: string): DojoCall => {
		return {
			contractName: "evlt_topup",
			entrypoint: "get_topup_history",
			calldata: [user],
		};
	};

	const evlt_topup_getTopupHistory = async (user: string) => {
		try {
			return await provider.call("evolute_duel", build_evlt_topup_getTopupHistory_calldata(user));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_evlt_topup_getTotalTopups_calldata = (user: string): DojoCall => {
		return {
			contractName: "evlt_topup",
			entrypoint: "get_total_topups",
			calldata: [user],
		};
	};

	const evlt_topup_getTotalTopups = async (user: string) => {
		try {
			return await provider.call("evolute_duel", build_evlt_topup_getTotalTopups_calldata(user));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_evlt_topup_grantRole_calldata = (role: BigNumberish, account: string): DojoCall => {
		return {
			contractName: "evlt_topup",
			entrypoint: "grantRole",
			calldata: [role, account],
		};
	};

	const evlt_topup_grantRole = async (snAccount: Account | AccountInterface, role: BigNumberish, account: string) => {
		try {
			return await provider.execute(
				snAccount,
				build_evlt_topup_grantRole_calldata(role, account),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_evlt_topup_grantMinterRole_calldata = (account: string): DojoCall => {
		return {
			contractName: "evlt_topup",
			entrypoint: "grant_minter_role",
			calldata: [account],
		};
	};

	const evlt_topup_grantMinterRole = async (snAccount: Account | AccountInterface, account: string) => {
		try {
			return await provider.execute(
				snAccount,
				build_evlt_topup_grantMinterRole_calldata(account),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_evlt_topup_hasRole_calldata = (role: BigNumberish, account: string): DojoCall => {
		return {
			contractName: "evlt_topup",
			entrypoint: "hasRole",
			calldata: [role, account],
		};
	};

	const evlt_topup_hasRole = async (role: BigNumberish, account: string) => {
		try {
			return await provider.call("evolute_duel", build_evlt_topup_hasRole_calldata(role, account));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_evlt_topup_mintEvlt_calldata = (user: string, amount: BigNumberish, source: BigNumberish): DojoCall => {
		return {
			contractName: "evlt_topup",
			entrypoint: "mint_evlt",
			calldata: [user, amount, source],
		};
	};

	const evlt_topup_mintEvlt = async (snAccount: Account | AccountInterface, user: string, amount: BigNumberish, source: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_evlt_topup_mintEvlt_calldata(user, amount, source),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_evlt_topup_mintEvltBatch_calldata = (users: Array<string>, amounts: Array<BigNumberish>, source: BigNumberish): DojoCall => {
		return {
			contractName: "evlt_topup",
			entrypoint: "mint_evlt_batch",
			calldata: [users, amounts, source],
		};
	};

	const evlt_topup_mintEvltBatch = async (snAccount: Account | AccountInterface, users: Array<string>, amounts: Array<BigNumberish>, source: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_evlt_topup_mintEvltBatch_calldata(users, amounts, source),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_evlt_topup_renounceRole_calldata = (role: BigNumberish, account: string): DojoCall => {
		return {
			contractName: "evlt_topup",
			entrypoint: "renounceRole",
			calldata: [role, account],
		};
	};

	const evlt_topup_renounceRole = async (snAccount: Account | AccountInterface, role: BigNumberish, account: string) => {
		try {
			return await provider.execute(
				snAccount,
				build_evlt_topup_renounceRole_calldata(role, account),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_evlt_topup_revokeRole_calldata = (role: BigNumberish, account: string): DojoCall => {
		return {
			contractName: "evlt_topup",
			entrypoint: "revokeRole",
			calldata: [role, account],
		};
	};

	const evlt_topup_revokeRole = async (snAccount: Account | AccountInterface, role: BigNumberish, account: string) => {
		try {
			return await provider.execute(
				snAccount,
				build_evlt_topup_revokeRole_calldata(role, account),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_evlt_topup_revokeMinterRole_calldata = (account: string): DojoCall => {
		return {
			contractName: "evlt_topup",
			entrypoint: "revoke_minter_role",
			calldata: [account],
		};
	};

	const evlt_topup_revokeMinterRole = async (snAccount: Account | AccountInterface, account: string) => {
		try {
			return await provider.execute(
				snAccount,
				build_evlt_topup_revokeMinterRole_calldata(account),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_evlt_topup_supportsInterface_calldata = (interfaceId: BigNumberish): DojoCall => {
		return {
			contractName: "evlt_topup",
			entrypoint: "supports_interface",
			calldata: [interfaceId],
		};
	};

	const evlt_topup_supportsInterface = async (interfaceId: BigNumberish) => {
		try {
			return await provider.call("evolute_duel", build_evlt_topup_supportsInterface_calldata(interfaceId));
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

	const build_grnd_token_allowance_calldata = (owner: string, spender: string): DojoCall => {
		return {
			contractName: "grnd_token",
			entrypoint: "allowance",
			calldata: [owner, spender],
		};
	};

	const grnd_token_allowance = async (owner: string, spender: string) => {
		try {
			return await provider.call("evolute_duel", build_grnd_token_allowance_calldata(owner, spender));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_grnd_token_approve_calldata = (spender: string, amount: BigNumberish): DojoCall => {
		return {
			contractName: "grnd_token",
			entrypoint: "approve",
			calldata: [spender, amount],
		};
	};

	const grnd_token_approve = async (snAccount: Account | AccountInterface, spender: string, amount: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_grnd_token_approve_calldata(spender, amount),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_grnd_token_balanceOf_calldata = (account: string): DojoCall => {
		return {
			contractName: "grnd_token",
			entrypoint: "balanceOf",
			calldata: [account],
		};
	};

	const grnd_token_balanceOf = async (account: string) => {
		try {
			return await provider.call("evolute_duel", build_grnd_token_balanceOf_calldata(account));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_grnd_token_burn_calldata = (from: string, amount: BigNumberish): DojoCall => {
		return {
			contractName: "grnd_token",
			entrypoint: "burn",
			calldata: [from, amount],
		};
	};

	const grnd_token_burn = async (snAccount: Account | AccountInterface, from: string, amount: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_grnd_token_burn_calldata(from, amount),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_grnd_token_decimals_calldata = (): DojoCall => {
		return {
			contractName: "grnd_token",
			entrypoint: "decimals",
			calldata: [],
		};
	};

	const grnd_token_decimals = async () => {
		try {
			return await provider.call("evolute_duel", build_grnd_token_decimals_calldata());
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_grnd_token_getRoleAdmin_calldata = (role: BigNumberish): DojoCall => {
		return {
			contractName: "grnd_token",
			entrypoint: "getRoleAdmin",
			calldata: [role],
		};
	};

	const grnd_token_getRoleAdmin = async (role: BigNumberish) => {
		try {
			return await provider.call("evolute_duel", build_grnd_token_getRoleAdmin_calldata(role));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_grnd_token_grantRole_calldata = (role: BigNumberish, account: string): DojoCall => {
		return {
			contractName: "grnd_token",
			entrypoint: "grantRole",
			calldata: [role, account],
		};
	};

	const grnd_token_grantRole = async (snAccount: Account | AccountInterface, role: BigNumberish, account: string) => {
		try {
			return await provider.execute(
				snAccount,
				build_grnd_token_grantRole_calldata(role, account),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_grnd_token_hasRole_calldata = (role: BigNumberish, account: string): DojoCall => {
		return {
			contractName: "grnd_token",
			entrypoint: "hasRole",
			calldata: [role, account],
		};
	};

	const grnd_token_hasRole = async (role: BigNumberish, account: string) => {
		try {
			return await provider.call("evolute_duel", build_grnd_token_hasRole_calldata(role, account));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_grnd_token_mint_calldata = (recipient: string, amount: BigNumberish): DojoCall => {
		return {
			contractName: "grnd_token",
			entrypoint: "mint",
			calldata: [recipient, amount],
		};
	};

	const grnd_token_mint = async (snAccount: Account | AccountInterface, recipient: string, amount: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_grnd_token_mint_calldata(recipient, amount),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_grnd_token_name_calldata = (): DojoCall => {
		return {
			contractName: "grnd_token",
			entrypoint: "name",
			calldata: [],
		};
	};

	const grnd_token_name = async () => {
		try {
			return await provider.call("evolute_duel", build_grnd_token_name_calldata());
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_grnd_token_renounceRole_calldata = (role: BigNumberish, account: string): DojoCall => {
		return {
			contractName: "grnd_token",
			entrypoint: "renounceRole",
			calldata: [role, account],
		};
	};

	const grnd_token_renounceRole = async (snAccount: Account | AccountInterface, role: BigNumberish, account: string) => {
		try {
			return await provider.execute(
				snAccount,
				build_grnd_token_renounceRole_calldata(role, account),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_grnd_token_revokeRole_calldata = (role: BigNumberish, account: string): DojoCall => {
		return {
			contractName: "grnd_token",
			entrypoint: "revokeRole",
			calldata: [role, account],
		};
	};

	const grnd_token_revokeRole = async (snAccount: Account | AccountInterface, role: BigNumberish, account: string) => {
		try {
			return await provider.execute(
				snAccount,
				build_grnd_token_revokeRole_calldata(role, account),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_grnd_token_rewardPlayer_calldata = (playerAddress: string, amount: BigNumberish): DojoCall => {
		return {
			contractName: "grnd_token",
			entrypoint: "reward_player",
			calldata: [playerAddress, amount],
		};
	};

	const grnd_token_rewardPlayer = async (snAccount: Account | AccountInterface, playerAddress: string, amount: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_grnd_token_rewardPlayer_calldata(playerAddress, amount),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_grnd_token_setBurner_calldata = (burnerAddress: string): DojoCall => {
		return {
			contractName: "grnd_token",
			entrypoint: "set_burner",
			calldata: [burnerAddress],
		};
	};

	const grnd_token_setBurner = async (snAccount: Account | AccountInterface, burnerAddress: string) => {
		try {
			return await provider.execute(
				snAccount,
				build_grnd_token_setBurner_calldata(burnerAddress),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_grnd_token_setMinter_calldata = (minterAddress: string): DojoCall => {
		return {
			contractName: "grnd_token",
			entrypoint: "set_minter",
			calldata: [minterAddress],
		};
	};

	const grnd_token_setMinter = async (snAccount: Account | AccountInterface, minterAddress: string) => {
		try {
			return await provider.execute(
				snAccount,
				build_grnd_token_setMinter_calldata(minterAddress),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_grnd_token_supportsInterface_calldata = (interfaceId: BigNumberish): DojoCall => {
		return {
			contractName: "grnd_token",
			entrypoint: "supports_interface",
			calldata: [interfaceId],
		};
	};

	const grnd_token_supportsInterface = async (interfaceId: BigNumberish) => {
		try {
			return await provider.call("evolute_duel", build_grnd_token_supportsInterface_calldata(interfaceId));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_grnd_token_symbol_calldata = (): DojoCall => {
		return {
			contractName: "grnd_token",
			entrypoint: "symbol",
			calldata: [],
		};
	};

	const grnd_token_symbol = async () => {
		try {
			return await provider.call("evolute_duel", build_grnd_token_symbol_calldata());
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_grnd_token_totalSupply_calldata = (): DojoCall => {
		return {
			contractName: "grnd_token",
			entrypoint: "totalSupply",
			calldata: [],
		};
	};

	const grnd_token_totalSupply = async () => {
		try {
			return await provider.call("evolute_duel", build_grnd_token_totalSupply_calldata());
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_grnd_token_transfer_calldata = (recipient: string, amount: BigNumberish): DojoCall => {
		return {
			contractName: "grnd_token",
			entrypoint: "transfer",
			calldata: [recipient, amount],
		};
	};

	const grnd_token_transfer = async (snAccount: Account | AccountInterface, recipient: string, amount: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_grnd_token_transfer_calldata(recipient, amount),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_grnd_token_transferFrom_calldata = (sender: string, recipient: string, amount: BigNumberish): DojoCall => {
		return {
			contractName: "grnd_token",
			entrypoint: "transferFrom",
			calldata: [sender, recipient, amount],
		};
	};

	const grnd_token_transferFrom = async (snAccount: Account | AccountInterface, sender: string, recipient: string, amount: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_grnd_token_transferFrom_calldata(sender, recipient, amount),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_matchmaking_adminCancelGame_calldata = (playerAddress: string): DojoCall => {
		return {
			contractName: "matchmaking",
			entrypoint: "admin_cancel_game",
			calldata: [playerAddress],
		};
	};

	const matchmaking_adminCancelGame = async (snAccount: Account | AccountInterface, playerAddress: string) => {
		try {
			return await provider.execute(
				snAccount,
				build_matchmaking_adminCancelGame_calldata(playerAddress),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_matchmaking_adminSetAdmin_calldata = (newAdmin: string): DojoCall => {
		return {
			contractName: "matchmaking",
			entrypoint: "admin_set_admin",
			calldata: [newAdmin],
		};
	};

	const matchmaking_adminSetAdmin = async (snAccount: Account | AccountInterface, newAdmin: string) => {
		try {
			return await provider.execute(
				snAccount,
				build_matchmaking_adminSetAdmin_calldata(newAdmin),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_matchmaking_autoMatch_calldata = (gameMode: BigNumberish, tournamentId: CairoOption<string>): DojoCall => {
		return {
			contractName: "matchmaking",
			entrypoint: "auto_match",
			calldata: [gameMode, tournamentId],
		};
	};

	const matchmaking_autoMatch = async (snAccount: Account | AccountInterface, gameMode: BigNumberish, tournamentId: CairoOption<string>) => {
		try {
			return await provider.execute(
				snAccount,
				build_matchmaking_autoMatch_calldata(gameMode, tournamentId),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_matchmaking_cancelGame_calldata = (): DojoCall => {
		return {
			contractName: "matchmaking",
			entrypoint: "cancel_game",
			calldata: [],
		};
	};

	const matchmaking_cancelGame = async (snAccount: Account | AccountInterface) => {
		try {
			return await provider.execute(
				snAccount,
				build_matchmaking_cancelGame_calldata(),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_matchmaking_createGame_calldata = (gameMode: BigNumberish, opponent: CairoOption<string>): DojoCall => {
		return {
			contractName: "matchmaking",
			entrypoint: "create_game",
			calldata: [gameMode, opponent],
		};
	};

	const matchmaking_createGame = async (snAccount: Account | AccountInterface, gameMode: BigNumberish, opponent: CairoOption<string>) => {
		try {
			return await provider.execute(
				snAccount,
				build_matchmaking_createGame_calldata(gameMode, opponent),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_matchmaking_joinGame_calldata = (hostPlayer: string): DojoCall => {
		return {
			contractName: "matchmaking",
			entrypoint: "join_game",
			calldata: [hostPlayer],
		};
	};

	const matchmaking_joinGame = async (snAccount: Account | AccountInterface, hostPlayer: string) => {
		try {
			return await provider.execute(
				snAccount,
				build_matchmaking_joinGame_calldata(hostPlayer),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_matchmaking_owner_calldata = (): DojoCall => {
		return {
			contractName: "matchmaking",
			entrypoint: "owner",
			calldata: [],
		};
	};

	const matchmaking_owner = async () => {
		try {
			return await provider.call("evolute_duel", build_matchmaking_owner_calldata());
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_matchmaking_renounceOwnership_calldata = (): DojoCall => {
		return {
			contractName: "matchmaking",
			entrypoint: "renounceOwnership",
			calldata: [],
		};
	};

	const matchmaking_renounceOwnership = async (snAccount: Account | AccountInterface) => {
		try {
			return await provider.execute(
				snAccount,
				build_matchmaking_renounceOwnership_calldata(),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_matchmaking_transferOwnership_calldata = (newOwner: string): DojoCall => {
		return {
			contractName: "matchmaking",
			entrypoint: "transferOwnership",
			calldata: [newOwner],
		};
	};

	const matchmaking_transferOwnership = async (snAccount: Account | AccountInterface, newOwner: string) => {
		try {
			return await provider.execute(
				snAccount,
				build_matchmaking_transferOwnership_calldata(newOwner),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_matchmaking_updateConfig_calldata = (gameMode: BigNumberish, boardSize: BigNumberish, deckType: BigNumberish, initialJokers: BigNumberish, timePerPhase: BigNumberish, autoMatch: boolean, deck: Array<BigNumberish>, edges: [BigNumberish, BigNumberish], jokerPrice: BigNumberish): DojoCall => {
		return {
			contractName: "matchmaking",
			entrypoint: "update_config",
			calldata: [gameMode, boardSize, deckType, initialJokers, timePerPhase, autoMatch, deck, edges, jokerPrice],
		};
	};

	const matchmaking_updateConfig = async (snAccount: Account | AccountInterface, gameMode: BigNumberish, boardSize: BigNumberish, deckType: BigNumberish, initialJokers: BigNumberish, timePerPhase: BigNumberish, autoMatch: boolean, deck: Array<BigNumberish>, edges: [BigNumberish, BigNumberish], jokerPrice: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_matchmaking_updateConfig_calldata(gameMode, boardSize, deckType, initialJokers, timePerPhase, autoMatch, deck, edges, jokerPrice),
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

	const build_tournament_token_approve_calldata = (to: string, tokenId: BigNumberish): DojoCall => {
		return {
			contractName: "tournament_token",
			entrypoint: "approve",
			calldata: [to, tokenId],
		};
	};

	const tournament_token_approve = async (snAccount: Account | AccountInterface, to: string, tokenId: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_tournament_token_approve_calldata(to, tokenId),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_tournament_token_balanceOf_calldata = (account: string): DojoCall => {
		return {
			contractName: "tournament_token",
			entrypoint: "balanceOf",
			calldata: [account],
		};
	};

	const tournament_token_balanceOf = async (account: string) => {
		try {
			return await provider.call("evolute_duel", build_tournament_token_balanceOf_calldata(account));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_tournament_token_canEndTournament_calldata = (passId: BigNumberish): DojoCall => {
		return {
			contractName: "tournament_token",
			entrypoint: "can_end_tournament",
			calldata: [passId],
		};
	};

	const tournament_token_canEndTournament = async (passId: BigNumberish) => {
		try {
			return await provider.call("evolute_duel", build_tournament_token_canEndTournament_calldata(passId));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_tournament_token_canEnlistDuelist_calldata = (passId: BigNumberish): DojoCall => {
		return {
			contractName: "tournament_token",
			entrypoint: "can_enlist_duelist",
			calldata: [passId],
		};
	};

	const tournament_token_canEnlistDuelist = async (passId: BigNumberish) => {
		try {
			return await provider.call("evolute_duel", build_tournament_token_canEnlistDuelist_calldata(passId));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_tournament_token_canJoinDuel_calldata = (passId: BigNumberish): DojoCall => {
		return {
			contractName: "tournament_token",
			entrypoint: "can_join_duel",
			calldata: [passId],
		};
	};

	const tournament_token_canJoinDuel = async (passId: BigNumberish) => {
		try {
			return await provider.call("evolute_duel", build_tournament_token_canJoinDuel_calldata(passId));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_tournament_token_canStartTournament_calldata = (passId: BigNumberish): DojoCall => {
		return {
			contractName: "tournament_token",
			entrypoint: "can_start_tournament",
			calldata: [passId],
		};
	};

	const tournament_token_canStartTournament = async (passId: BigNumberish) => {
		try {
			return await provider.call("evolute_duel", build_tournament_token_canStartTournament_calldata(passId));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_tournament_token_emitMetadataUpdate_calldata = (gameId: BigNumberish): DojoCall => {
		return {
			contractName: "tournament_token",
			entrypoint: "emit_metadata_update",
			calldata: [gameId],
		};
	};

	const tournament_token_emitMetadataUpdate = async (snAccount: Account | AccountInterface, gameId: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_tournament_token_emitMetadataUpdate_calldata(gameId),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_tournament_token_endTournament_calldata = (passId: BigNumberish): DojoCall => {
		return {
			contractName: "tournament_token",
			entrypoint: "end_tournament",
			calldata: [passId],
		};
	};

	const tournament_token_endTournament = async (snAccount: Account | AccountInterface, passId: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_tournament_token_endTournament_calldata(passId),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_tournament_token_enlistDuelist_calldata = (passId: BigNumberish): DojoCall => {
		return {
			contractName: "tournament_token",
			entrypoint: "enlist_duelist",
			calldata: [passId],
		};
	};

	const tournament_token_enlistDuelist = async (snAccount: Account | AccountInterface, passId: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_tournament_token_enlistDuelist_calldata(passId),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_tournament_token_gameCount_calldata = (): DojoCall => {
		return {
			contractName: "tournament_token",
			entrypoint: "game_count",
			calldata: [],
		};
	};

	const tournament_token_gameCount = async () => {
		try {
			return await provider.call("evolute_duel", build_tournament_token_gameCount_calldata());
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_tournament_token_gameMetadata_calldata = (): DojoCall => {
		return {
			contractName: "tournament_token",
			entrypoint: "game_metadata",
			calldata: [],
		};
	};

	const tournament_token_gameMetadata = async () => {
		try {
			return await provider.call("evolute_duel", build_tournament_token_gameMetadata_calldata());
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_tournament_token_getApproved_calldata = (tokenId: BigNumberish): DojoCall => {
		return {
			contractName: "tournament_token",
			entrypoint: "getApproved",
			calldata: [tokenId],
		};
	};

	const tournament_token_getApproved = async (tokenId: BigNumberish) => {
		try {
			return await provider.call("evolute_duel", build_tournament_token_getApproved_calldata(tokenId));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_tournament_token_isApprovedForAll_calldata = (owner: string, operator: string): DojoCall => {
		return {
			contractName: "tournament_token",
			entrypoint: "isApprovedForAll",
			calldata: [owner, operator],
		};
	};

	const tournament_token_isApprovedForAll = async (owner: string, operator: string) => {
		try {
			return await provider.call("evolute_duel", build_tournament_token_isApprovedForAll_calldata(owner, operator));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_tournament_token_joinDuel_calldata = (passId: BigNumberish): DojoCall => {
		return {
			contractName: "tournament_token",
			entrypoint: "join_duel",
			calldata: [passId],
		};
	};

	const tournament_token_joinDuel = async (snAccount: Account | AccountInterface, passId: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_tournament_token_joinDuel_calldata(passId),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_tournament_token_mint_calldata = (playerName: BigNumberish, settingsId: BigNumberish, start: CairoOption<BigNumberish>, end: CairoOption<BigNumberish>, to: string): DojoCall => {
		return {
			contractName: "tournament_token",
			entrypoint: "mint",
			calldata: [playerName, settingsId, start, end, to],
		};
	};

	const tournament_token_mint = async (snAccount: Account | AccountInterface, playerName: BigNumberish, settingsId: BigNumberish, start: CairoOption<BigNumberish>, end: CairoOption<BigNumberish>, to: string) => {
		try {
			return await provider.execute(
				snAccount,
				build_tournament_token_mint_calldata(playerName, settingsId, start, end, to),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_tournament_token_ownerOf_calldata = (tokenId: BigNumberish): DojoCall => {
		return {
			contractName: "tournament_token",
			entrypoint: "ownerOf",
			calldata: [tokenId],
		};
	};

	const tournament_token_ownerOf = async (tokenId: BigNumberish) => {
		try {
			return await provider.call("evolute_duel", build_tournament_token_ownerOf_calldata(tokenId));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_tournament_token_safeTransferFrom_calldata = (from: string, to: string, tokenId: BigNumberish, data: Array<BigNumberish>): DojoCall => {
		return {
			contractName: "tournament_token",
			entrypoint: "safeTransferFrom",
			calldata: [from, to, tokenId, data],
		};
	};

	const tournament_token_safeTransferFrom = async (snAccount: Account | AccountInterface, from: string, to: string, tokenId: BigNumberish, data: Array<BigNumberish>) => {
		try {
			return await provider.execute(
				snAccount,
				build_tournament_token_safeTransferFrom_calldata(from, to, tokenId, data),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_tournament_token_score_calldata = (gameId: BigNumberish): DojoCall => {
		return {
			contractName: "tournament_token",
			entrypoint: "score",
			calldata: [gameId],
		};
	};

	const tournament_token_score = async (gameId: BigNumberish) => {
		try {
			return await provider.call("evolute_duel", build_tournament_token_score_calldata(gameId));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_tournament_token_scoreAttribute_calldata = (): DojoCall => {
		return {
			contractName: "tournament_token",
			entrypoint: "score_attribute",
			calldata: [],
		};
	};

	const tournament_token_scoreAttribute = async () => {
		try {
			return await provider.call("evolute_duel", build_tournament_token_scoreAttribute_calldata());
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_tournament_token_scoreModel_calldata = (): DojoCall => {
		return {
			contractName: "tournament_token",
			entrypoint: "score_model",
			calldata: [],
		};
	};

	const tournament_token_scoreModel = async () => {
		try {
			return await provider.call("evolute_duel", build_tournament_token_scoreModel_calldata());
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_tournament_token_setApprovalForAll_calldata = (operator: string, approved: boolean): DojoCall => {
		return {
			contractName: "tournament_token",
			entrypoint: "setApprovalForAll",
			calldata: [operator, approved],
		};
	};

	const tournament_token_setApprovalForAll = async (snAccount: Account | AccountInterface, operator: string, approved: boolean) => {
		try {
			return await provider.execute(
				snAccount,
				build_tournament_token_setApprovalForAll_calldata(operator, approved),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_tournament_token_settingExists_calldata = (settingsId: BigNumberish): DojoCall => {
		return {
			contractName: "tournament_token",
			entrypoint: "setting_exists",
			calldata: [settingsId],
		};
	};

	const tournament_token_settingExists = async (settingsId: BigNumberish) => {
		try {
			return await provider.call("evolute_duel", build_tournament_token_settingExists_calldata(settingsId));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_tournament_token_settingsModel_calldata = (): DojoCall => {
		return {
			contractName: "tournament_token",
			entrypoint: "settings_model",
			calldata: [],
		};
	};

	const tournament_token_settingsModel = async () => {
		try {
			return await provider.call("evolute_duel", build_tournament_token_settingsModel_calldata());
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_tournament_token_startTournament_calldata = (passId: BigNumberish): DojoCall => {
		return {
			contractName: "tournament_token",
			entrypoint: "start_tournament",
			calldata: [passId],
		};
	};

	const tournament_token_startTournament = async (snAccount: Account | AccountInterface, passId: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_tournament_token_startTournament_calldata(passId),
				"evolute_duel",
			);
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_tournament_token_supportsInterface_calldata = (interfaceId: BigNumberish): DojoCall => {
		return {
			contractName: "tournament_token",
			entrypoint: "supports_interface",
			calldata: [interfaceId],
		};
	};

	const tournament_token_supportsInterface = async (interfaceId: BigNumberish) => {
		try {
			return await provider.call("evolute_duel", build_tournament_token_supportsInterface_calldata(interfaceId));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_tournament_token_tokenMetadata_calldata = (tokenId: BigNumberish): DojoCall => {
		return {
			contractName: "tournament_token",
			entrypoint: "token_metadata",
			calldata: [tokenId],
		};
	};

	const tournament_token_tokenMetadata = async (tokenId: BigNumberish) => {
		try {
			return await provider.call("evolute_duel", build_tournament_token_tokenMetadata_calldata(tokenId));
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	const build_tournament_token_transferFrom_calldata = (from: string, to: string, tokenId: BigNumberish): DojoCall => {
		return {
			contractName: "tournament_token",
			entrypoint: "transferFrom",
			calldata: [from, to, tokenId],
		};
	};

	const tournament_token_transferFrom = async (snAccount: Account | AccountInterface, from: string, to: string, tokenId: BigNumberish) => {
		try {
			return await provider.execute(
				snAccount,
				build_tournament_token_transferFrom_calldata(from, to, tokenId),
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
		evlt_token: {
			allowance: evlt_token_allowance,
			buildAllowanceCalldata: build_evlt_token_allowance_calldata,
			approve: evlt_token_approve,
			buildApproveCalldata: build_evlt_token_approve_calldata,
			balanceOf: evlt_token_balanceOf,
			buildBalanceOfCalldata: build_evlt_token_balanceOf_calldata,
			burn: evlt_token_burn,
			buildBurnCalldata: build_evlt_token_burn_calldata,
			decimals: evlt_token_decimals,
			buildDecimalsCalldata: build_evlt_token_decimals_calldata,
			getRoleAdmin: evlt_token_getRoleAdmin,
			buildGetRoleAdminCalldata: build_evlt_token_getRoleAdmin_calldata,
			grantRole: evlt_token_grantRole,
			buildGrantRoleCalldata: build_evlt_token_grantRole_calldata,
			hasRole: evlt_token_hasRole,
			buildHasRoleCalldata: build_evlt_token_hasRole_calldata,
			mint: evlt_token_mint,
			buildMintCalldata: build_evlt_token_mint_calldata,
			name: evlt_token_name,
			buildNameCalldata: build_evlt_token_name_calldata,
			renounceRole: evlt_token_renounceRole,
			buildRenounceRoleCalldata: build_evlt_token_renounceRole_calldata,
			revokeRole: evlt_token_revokeRole,
			buildRevokeRoleCalldata: build_evlt_token_revokeRole_calldata,
			setBurner: evlt_token_setBurner,
			buildSetBurnerCalldata: build_evlt_token_setBurner_calldata,
			setMinter: evlt_token_setMinter,
			buildSetMinterCalldata: build_evlt_token_setMinter_calldata,
			setTransferAllowed: evlt_token_setTransferAllowed,
			buildSetTransferAllowedCalldata: build_evlt_token_setTransferAllowed_calldata,
			supportsInterface: evlt_token_supportsInterface,
			buildSupportsInterfaceCalldata: build_evlt_token_supportsInterface_calldata,
			symbol: evlt_token_symbol,
			buildSymbolCalldata: build_evlt_token_symbol_calldata,
			totalSupply: evlt_token_totalSupply,
			buildTotalSupplyCalldata: build_evlt_token_totalSupply_calldata,
			transfer: evlt_token_transfer,
			buildTransferCalldata: build_evlt_token_transfer_calldata,
			transferFrom: evlt_token_transferFrom,
			buildTransferFromCalldata: build_evlt_token_transferFrom_calldata,
		},
		evlt_topup: {
			getRoleAdmin: evlt_topup_getRoleAdmin,
			buildGetRoleAdminCalldata: build_evlt_topup_getRoleAdmin_calldata,
			getTopupHistory: evlt_topup_getTopupHistory,
			buildGetTopupHistoryCalldata: build_evlt_topup_getTopupHistory_calldata,
			getTotalTopups: evlt_topup_getTotalTopups,
			buildGetTotalTopupsCalldata: build_evlt_topup_getTotalTopups_calldata,
			grantRole: evlt_topup_grantRole,
			buildGrantRoleCalldata: build_evlt_topup_grantRole_calldata,
			grantMinterRole: evlt_topup_grantMinterRole,
			buildGrantMinterRoleCalldata: build_evlt_topup_grantMinterRole_calldata,
			hasRole: evlt_topup_hasRole,
			buildHasRoleCalldata: build_evlt_topup_hasRole_calldata,
			mintEvlt: evlt_topup_mintEvlt,
			buildMintEvltCalldata: build_evlt_topup_mintEvlt_calldata,
			mintEvltBatch: evlt_topup_mintEvltBatch,
			buildMintEvltBatchCalldata: build_evlt_topup_mintEvltBatch_calldata,
			renounceRole: evlt_topup_renounceRole,
			buildRenounceRoleCalldata: build_evlt_topup_renounceRole_calldata,
			revokeRole: evlt_topup_revokeRole,
			buildRevokeRoleCalldata: build_evlt_topup_revokeRole_calldata,
			revokeMinterRole: evlt_topup_revokeMinterRole,
			buildRevokeMinterRoleCalldata: build_evlt_topup_revokeMinterRole_calldata,
			supportsInterface: evlt_topup_supportsInterface,
			buildSupportsInterfaceCalldata: build_evlt_topup_supportsInterface_calldata,
		},
		game: {
			commitTiles: game_commitTiles,
			buildCommitTilesCalldata: build_game_commitTiles_calldata,
			finishGame: game_finishGame,
			buildFinishGameCalldata: build_game_finishGame_calldata,
			makeMove: game_makeMove,
			buildMakeMoveCalldata: build_game_makeMove_calldata,
			requestNextTile: game_requestNextTile,
			buildRequestNextTileCalldata: build_game_requestNextTile_calldata,
			revealTile: game_revealTile,
			buildRevealTileCalldata: build_game_revealTile_calldata,
			skipMove: game_skipMove,
			buildSkipMoveCalldata: build_game_skipMove_calldata,
		},
		grnd_token: {
			allowance: grnd_token_allowance,
			buildAllowanceCalldata: build_grnd_token_allowance_calldata,
			approve: grnd_token_approve,
			buildApproveCalldata: build_grnd_token_approve_calldata,
			balanceOf: grnd_token_balanceOf,
			buildBalanceOfCalldata: build_grnd_token_balanceOf_calldata,
			burn: grnd_token_burn,
			buildBurnCalldata: build_grnd_token_burn_calldata,
			decimals: grnd_token_decimals,
			buildDecimalsCalldata: build_grnd_token_decimals_calldata,
			getRoleAdmin: grnd_token_getRoleAdmin,
			buildGetRoleAdminCalldata: build_grnd_token_getRoleAdmin_calldata,
			grantRole: grnd_token_grantRole,
			buildGrantRoleCalldata: build_grnd_token_grantRole_calldata,
			hasRole: grnd_token_hasRole,
			buildHasRoleCalldata: build_grnd_token_hasRole_calldata,
			mint: grnd_token_mint,
			buildMintCalldata: build_grnd_token_mint_calldata,
			name: grnd_token_name,
			buildNameCalldata: build_grnd_token_name_calldata,
			renounceRole: grnd_token_renounceRole,
			buildRenounceRoleCalldata: build_grnd_token_renounceRole_calldata,
			revokeRole: grnd_token_revokeRole,
			buildRevokeRoleCalldata: build_grnd_token_revokeRole_calldata,
			rewardPlayer: grnd_token_rewardPlayer,
			buildRewardPlayerCalldata: build_grnd_token_rewardPlayer_calldata,
			setBurner: grnd_token_setBurner,
			buildSetBurnerCalldata: build_grnd_token_setBurner_calldata,
			setMinter: grnd_token_setMinter,
			buildSetMinterCalldata: build_grnd_token_setMinter_calldata,
			supportsInterface: grnd_token_supportsInterface,
			buildSupportsInterfaceCalldata: build_grnd_token_supportsInterface_calldata,
			symbol: grnd_token_symbol,
			buildSymbolCalldata: build_grnd_token_symbol_calldata,
			totalSupply: grnd_token_totalSupply,
			buildTotalSupplyCalldata: build_grnd_token_totalSupply_calldata,
			transfer: grnd_token_transfer,
			buildTransferCalldata: build_grnd_token_transfer_calldata,
			transferFrom: grnd_token_transferFrom,
			buildTransferFromCalldata: build_grnd_token_transferFrom_calldata,
		},
		matchmaking: {
			adminCancelGame: matchmaking_adminCancelGame,
			buildAdminCancelGameCalldata: build_matchmaking_adminCancelGame_calldata,
			adminSetAdmin: matchmaking_adminSetAdmin,
			buildAdminSetAdminCalldata: build_matchmaking_adminSetAdmin_calldata,
			autoMatch: matchmaking_autoMatch,
			buildAutoMatchCalldata: build_matchmaking_autoMatch_calldata,
			cancelGame: matchmaking_cancelGame,
			buildCancelGameCalldata: build_matchmaking_cancelGame_calldata,
			createGame: matchmaking_createGame,
			buildCreateGameCalldata: build_matchmaking_createGame_calldata,
			joinGame: matchmaking_joinGame,
			buildJoinGameCalldata: build_matchmaking_joinGame_calldata,
			owner: matchmaking_owner,
			buildOwnerCalldata: build_matchmaking_owner_calldata,
			renounceOwnership: matchmaking_renounceOwnership,
			buildRenounceOwnershipCalldata: build_matchmaking_renounceOwnership_calldata,
			transferOwnership: matchmaking_transferOwnership,
			buildTransferOwnershipCalldata: build_matchmaking_transferOwnership_calldata,
			updateConfig: matchmaking_updateConfig,
			buildUpdateConfigCalldata: build_matchmaking_updateConfig_calldata,
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
		tournament_token: {
			approve: tournament_token_approve,
			buildApproveCalldata: build_tournament_token_approve_calldata,
			balanceOf: tournament_token_balanceOf,
			buildBalanceOfCalldata: build_tournament_token_balanceOf_calldata,
			canEndTournament: tournament_token_canEndTournament,
			buildCanEndTournamentCalldata: build_tournament_token_canEndTournament_calldata,
			canEnlistDuelist: tournament_token_canEnlistDuelist,
			buildCanEnlistDuelistCalldata: build_tournament_token_canEnlistDuelist_calldata,
			canJoinDuel: tournament_token_canJoinDuel,
			buildCanJoinDuelCalldata: build_tournament_token_canJoinDuel_calldata,
			canStartTournament: tournament_token_canStartTournament,
			buildCanStartTournamentCalldata: build_tournament_token_canStartTournament_calldata,
			emitMetadataUpdate: tournament_token_emitMetadataUpdate,
			buildEmitMetadataUpdateCalldata: build_tournament_token_emitMetadataUpdate_calldata,
			endTournament: tournament_token_endTournament,
			buildEndTournamentCalldata: build_tournament_token_endTournament_calldata,
			enlistDuelist: tournament_token_enlistDuelist,
			buildEnlistDuelistCalldata: build_tournament_token_enlistDuelist_calldata,
			gameCount: tournament_token_gameCount,
			buildGameCountCalldata: build_tournament_token_gameCount_calldata,
			gameMetadata: tournament_token_gameMetadata,
			buildGameMetadataCalldata: build_tournament_token_gameMetadata_calldata,
			getApproved: tournament_token_getApproved,
			buildGetApprovedCalldata: build_tournament_token_getApproved_calldata,
			isApprovedForAll: tournament_token_isApprovedForAll,
			buildIsApprovedForAllCalldata: build_tournament_token_isApprovedForAll_calldata,
			joinDuel: tournament_token_joinDuel,
			buildJoinDuelCalldata: build_tournament_token_joinDuel_calldata,
			mint: tournament_token_mint,
			buildMintCalldata: build_tournament_token_mint_calldata,
			ownerOf: tournament_token_ownerOf,
			buildOwnerOfCalldata: build_tournament_token_ownerOf_calldata,
			safeTransferFrom: tournament_token_safeTransferFrom,
			buildSafeTransferFromCalldata: build_tournament_token_safeTransferFrom_calldata,
			score: tournament_token_score,
			buildScoreCalldata: build_tournament_token_score_calldata,
			scoreAttribute: tournament_token_scoreAttribute,
			buildScoreAttributeCalldata: build_tournament_token_scoreAttribute_calldata,
			scoreModel: tournament_token_scoreModel,
			buildScoreModelCalldata: build_tournament_token_scoreModel_calldata,
			setApprovalForAll: tournament_token_setApprovalForAll,
			buildSetApprovalForAllCalldata: build_tournament_token_setApprovalForAll_calldata,
			settingExists: tournament_token_settingExists,
			buildSettingExistsCalldata: build_tournament_token_settingExists_calldata,
			settingsModel: tournament_token_settingsModel,
			buildSettingsModelCalldata: build_tournament_token_settingsModel_calldata,
			startTournament: tournament_token_startTournament,
			buildStartTournamentCalldata: build_tournament_token_startTournament_calldata,
			supportsInterface: tournament_token_supportsInterface,
			buildSupportsInterfaceCalldata: build_tournament_token_supportsInterface_calldata,
			tokenMetadata: tournament_token_tokenMetadata,
			buildTokenMetadataCalldata: build_tournament_token_tokenMetadata_calldata,
			transferFrom: tournament_token_transferFrom,
			buildTransferFromCalldata: build_tournament_token_transferFrom_calldata,
		},
		tutorial: {
			makeMove: tutorial_makeMove,
			buildMakeMoveCalldata: build_tutorial_makeMove_calldata,
			skipMove: tutorial_skipMove,
			buildSkipMoveCalldata: build_tutorial_skipMove_calldata,
		},
	};
}