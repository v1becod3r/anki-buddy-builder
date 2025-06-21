
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings } from 'lucide-react';
import { SpacedRepetitionConfig } from '@/types/config';

interface ConfigDialogProps {
  config: SpacedRepetitionConfig;
  onConfigChange: (config: SpacedRepetitionConfig) => void;
}

const ConfigDialog: React.FC<ConfigDialogProps> = ({ config, onConfigChange }) => {
  const [localConfig, setLocalConfig] = useState<SpacedRepetitionConfig>(config);
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    onConfigChange(localConfig);
    setOpen(false);
  };

  const handleReset = () => {
    setLocalConfig(config);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-gray-600 hover:text-gray-800">
          <Settings className="w-5 h-5 mr-2" />
          Spaced Repetition Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Spaced Repetition Configuration</DialogTitle>
          <DialogDescription>
            Customize how the spaced repetition algorithm calculates review intervals.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Base Intervals */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Base Intervals</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="initialInterval">Initial Interval (days)</Label>
                <Input
                  id="initialInterval"
                  type="number"
                  min="1"
                  value={localConfig.initialInterval}
                  onChange={(e) => setLocalConfig({
                    ...localConfig,
                    initialInterval: parseInt(e.target.value) || 1
                  })}
                />
              </div>
              <div>
                <Label htmlFor="secondInterval">Second Interval (days)</Label>
                <Input
                  id="secondInterval"
                  type="number"
                  min="1"
                  value={localConfig.secondInterval}
                  onChange={(e) => setLocalConfig({
                    ...localConfig,
                    secondInterval: parseInt(e.target.value) || 6
                  })}
                />
              </div>
            </div>
          </div>

          {/* Difficulty Multipliers */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Difficulty Multipliers</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="againMultiplier">Again Multiplier</Label>
                <Input
                  id="againMultiplier"
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={localConfig.againMultiplier}
                  onChange={(e) => setLocalConfig({
                    ...localConfig,
                    againMultiplier: parseFloat(e.target.value) || 1
                  })}
                />
              </div>
              <div>
                <Label htmlFor="hardMultiplier">Hard Multiplier</Label>
                <Input
                  id="hardMultiplier"
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={localConfig.hardMultiplier}
                  onChange={(e) => setLocalConfig({
                    ...localConfig,
                    hardMultiplier: parseFloat(e.target.value) || 1.2
                  })}
                />
              </div>
              <div>
                <Label htmlFor="easyMultiplier">Easy Multiplier</Label>
                <Input
                  id="easyMultiplier"
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={localConfig.easyMultiplier}
                  onChange={(e) => setLocalConfig({
                    ...localConfig,
                    easyMultiplier: parseFloat(e.target.value) || 1.3
                  })}
                />
              </div>
            </div>
          </div>

          {/* Ease Factor Adjustments */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Ease Factor Adjustments</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hardAdjustment">Hard Adjustment</Label>
                <Input
                  id="hardAdjustment"
                  type="number"
                  step="0.01"
                  value={localConfig.easeFactorAdjustment.hard}
                  onChange={(e) => setLocalConfig({
                    ...localConfig,
                    easeFactorAdjustment: {
                      ...localConfig.easeFactorAdjustment,
                      hard: parseFloat(e.target.value) || -0.15
                    }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="easyAdjustment">Easy Adjustment</Label>
                <Input
                  id="easyAdjustment"
                  type="number"
                  step="0.01"
                  value={localConfig.easeFactorAdjustment.easy}
                  onChange={(e) => setLocalConfig({
                    ...localConfig,
                    easeFactorAdjustment: {
                      ...localConfig.easeFactorAdjustment,
                      easy: parseFloat(e.target.value) || 0.15
                    }
                  })}
                />
              </div>
            </div>
          </div>

          {/* Limits */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Limits</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="minEaseFactor">Min Ease Factor</Label>
                <Input
                  id="minEaseFactor"
                  type="number"
                  step="0.1"
                  min="1.0"
                  value={localConfig.minEaseFactor}
                  onChange={(e) => setLocalConfig({
                    ...localConfig,
                    minEaseFactor: parseFloat(e.target.value) || 1.3
                  })}
                />
              </div>
              <div>
                <Label htmlFor="maxEaseFactor">Max Ease Factor</Label>
                <Input
                  id="maxEaseFactor"
                  type="number"
                  step="0.1"
                  min="1.0"
                  value={localConfig.maxEaseFactor}
                  onChange={(e) => setLocalConfig({
                    ...localConfig,
                    maxEaseFactor: parseFloat(e.target.value) || 2.5
                  })}
                />
              </div>
              <div>
                <Label htmlFor="minInterval">Min Interval (days)</Label>
                <Input
                  id="minInterval"
                  type="number"
                  min="1"
                  value={localConfig.minInterval}
                  onChange={(e) => setLocalConfig({
                    ...localConfig,
                    minInterval: parseInt(e.target.value) || 1
                  })}
                />
              </div>
              <div>
                <Label htmlFor="maxInterval">Max Interval (days)</Label>
                <Input
                  id="maxInterval"
                  type="number"
                  min="1"
                  value={localConfig.maxInterval}
                  onChange={(e) => setLocalConfig({
                    ...localConfig,
                    maxInterval: parseInt(e.target.value) || 365
                  })}
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleSave}>
            Save Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigDialog;
