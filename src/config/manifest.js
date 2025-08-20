// Default manifest for Evolute Dojo game
export const manifest = {
  "world": {
    "kind": "WorldContract",
    "class_hash": "0x0230035e44105bbc11acf2dd1b271a78d53627a810e6a2fb024fd2edcf273c9c",
    "original_class_hash": "0x0230035e44105bbc11acf2dd1b271a78d53627a810e6a2fb024fd2edcf273c9c",
    "abi": [],
    "address": "0x0230035e44105bbc11acf2dd1b271a78d53627a810e6a2fb024fd2edcf273c9c",
    "transaction_hash": "0x",
    "block_number": null,
    "seed": "evolute-duel",
    "metadata": {
      "profile_name": "dev",
      "rpc_url": "https://api.cartridge.gg/x/dev-evolute-duel/katana"
    }
  },
  "contracts": [
    {
      "kind": "DojoContract", 
      "address": "0x00914690e3286dd88f560530c1780d664cd8eef9711f6e7a3c27265529bf2795",
      "class_hash": "0x",
      "original_class_hash": "0x",
      "base_class_hash": "0x",
      "abi": [],
      "reads": [],
      "writes": [],
      "computed": [],
      "name": "GameContract",
      "namespace": "evolute",
      "tag": "evolute-GameContract",
      "systems": [
        "create_game",
        "join_game",
        "submit_move"
      ],
      "manifest_name": "evolute-GameContract"
    }
  ],
  "models": [],
  "events": []
};