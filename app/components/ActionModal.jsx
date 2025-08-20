'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';

export default function ActionModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  actionType, 
  actionName,
  isLoading = false 
}) {
  const [formData, setFormData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setFormData({});
    onClose();
  };

  const getFormFields = () => {
    switch (actionType) {
      case 'make_move':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="rotation">Rotation</Label>
              <Select onValueChange={(value) => handleInputChange('rotation', parseInt(value))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select rotation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0°</SelectItem>
                  <SelectItem value="90">90°</SelectItem>
                  <SelectItem value="180">180°</SelectItem>
                  <SelectItem value="270">270°</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="col">Column</Label>
                <Input
                  id="col"
                  type="number"
                  min="0"
                  max="14"
                  placeholder="0-14"
                  onChange={(e) => handleInputChange('col', parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="row">Row</Label>
                <Input
                  id="row"
                  type="number"
                  min="0"
                  max="14"
                  placeholder="0-14"
                  onChange={(e) => handleInputChange('row', parseInt(e.target.value))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="jokerTile">Joker Tile (optional)</Label>
              <Input
                id="jokerTile"
                placeholder="Leave empty if no joker"
                onChange={(e) => handleInputChange('jokerTile', e.target.value || null)}
              />
            </div>
          </>
        );

      case 'commit_tiles':
        return (
          <div className="space-y-2">
            <Label htmlFor="commitments">Tile Commitments (JSON array)</Label>
            <Textarea
              id="commitments"
              placeholder='[{"tileIndex": 0, "commitment": "0x123..."}]'
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value);
                  handleInputChange('commitments', parsed);
                } catch {
                  // Invalid JSON, ignore
                }
              }}
            />
          </div>
        );

      case 'reveal_tile':
      case 'request_next_tile':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="tileIndex">Tile Index</Label>
              <Input
                id="tileIndex"
                type="number"
                min="0"
                placeholder="Tile index"
                onChange={(e) => handleInputChange('tileIndex', parseInt(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nonce">Nonce</Label>
              <Input
                id="nonce"
                placeholder="Nonce value"
                onChange={(e) => handleInputChange('nonce', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="c">C Value</Label>
              <Input
                id="c"
                placeholder="C value"
                onChange={(e) => handleInputChange('c', e.target.value)}
              />
            </div>
          </>
        );

      case 'finish_game':
        return (
          <div className="space-y-2">
            <Label htmlFor="boardId">Board ID</Label>
            <Input
              id="boardId"
              type="number"
              min="0"
              placeholder="Board ID"
              onChange={(e) => handleInputChange('boardId', parseInt(e.target.value))}
            />
          </div>
        );

      case 'join_game':
        return (
          <div className="space-y-2">
            <Label htmlFor="hostPlayer">Host Player Address</Label>
            <Input
              id="hostPlayer"
              placeholder="0x..."
              onChange={(e) => handleInputChange('hostPlayer', e.target.value)}
            />
          </div>
        );

      case 'change_username':
        return (
          <div className="space-y-2">
            <Label htmlFor="newUsername">New Username</Label>
            <Input
              id="newUsername"
              placeholder="Enter new username"
              onChange={(e) => handleInputChange('newUsername', e.target.value)}
            />
          </div>
        );

      case 'change_skin':
        return (
          <div className="space-y-2">
            <Label htmlFor="skinId">Skin ID</Label>
            <Input
              id="skinId"
              type="number"
              min="0"
              placeholder="Skin ID"
              onChange={(e) => handleInputChange('skinId', parseInt(e.target.value))}
            />
          </div>
        );

      case 'set_player':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="playerId">Player ID</Label>
              <Input
                id="playerId"
                placeholder="Player ID"
                onChange={(e) => handleInputChange('playerId', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Username"
                onChange={(e) => handleInputChange('username', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="balance">Balance</Label>
                <Input
                  id="balance"
                  type="number"
                  min="0"
                  placeholder="Balance"
                  onChange={(e) => handleInputChange('balance', parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gamesPlayed">Games Played</Label>
                <Input
                  id="gamesPlayed"
                  type="number"
                  min="0"
                  placeholder="Games played"
                  onChange={(e) => handleInputChange('gamesPlayed', parseInt(e.target.value))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="activeSkin">Active Skin</Label>
                <Input
                  id="activeSkin"
                  type="number"
                  min="0"
                  placeholder="Active skin ID"
                  onChange={(e) => handleInputChange('activeSkin', parseInt(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select onValueChange={(value) => handleInputChange('role', parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Player</SelectItem>
                    <SelectItem value="1">Bot</SelectItem>
                    <SelectItem value="2">Controller</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        );

      default:
        return (
          <div className="text-center text-muted-foreground">
            No additional parameters required for this action.
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetForm}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{actionName || 'Execute Action'}</DialogTitle>
          <DialogDescription>
            Enter the required parameters for this action.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {getFormFields()}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={resetForm}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Executing...' : 'Execute'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}