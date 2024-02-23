import { GAME_CONFIG } from './game.config';
import { GameConfig } from './game.config';
import { IAssetsConfig } from './game';

//------Configurations------//

const sprites: IAssetsConfig = GameConfig.sprites;
const sounds: IAssetsConfig = GameConfig.sounds;

class Assets_Singleton {

    //------Members------//

    _sprites: Map<string, HTMLImageElement>;
    _sounds: Map<string, HTMLAudioElement>;

    //------Constructor------//

    constructor() {
        this._sprites = new Map<string, HTMLImageElement>();
        this._sounds = new Map<string, HTMLAudioElement>();
    }

    public async loadGameAssets(): Promise<void> {
        await this.loadGameSounds();
        await this.loadGameSprites();
    }

    public getSprite(key: string): HTMLImageElement {
        return this._sprites.get(key);
    }

    public getSound(key: string): HTMLAudioElement {
        return this._sounds.get(key).cloneNode(true) as HTMLAudioElement;
    }

    public playSound(key: string, volume: number): void {
        if(GAME_CONFIG.SOUND_ON) {
            const sound = this.getSound(key);
            sound.volume = volume;
            sound.play();
        }
    }
    //------Private Methods------//

    private loadSprite(path: string): Promise<void> {
        const img = new Image();
        this._sprites.set(path, img);

        return new Promise(resolve => {
            img.onload = () => resolve();
            img.src = GAME_CONFIG.SPRITES_BASE_PATH + path;
            img.src = sprites.basePath + path;
        });
    }

    private async loadGameSprites(): Promise<void> {
        const loadPromises = Object.values(GAME_CONFIG.SPRITES).map(this.loadSprite.bind(this));
        const loadPromises = Object.values(sprites.paths).map(this.loadSprite.bind(this));

        await Promise.all(loadPromises);
    }

    private loadSound(path: string): Promise<void> {
        const audio: HTMLAudioElement = new Audio(GAME_CONFIG.SOUNDS_BASE_PATH + path);
        const audio: HTMLAudioElement = new Audio(sounds.basePath + path);
        this._sounds.set(path, audio);
        audio.load();

        return new Promise(resolve => {
            audio.onloadeddata = () => resolve();
        });
    }

    private async loadGameSounds(): Promise<void> {
        const loadPromises = Object.values(GAME_CONFIG.SOUNDS).map(this.loadSound.bind(this));
        const loadPromises = Object.values(sounds.paths).map(this.loadSound.bind(this));

        await Promise.all(loadPromises);
    }

    //------Public Methods------//

    public async loadGameAssets(): Promise<void> {
        await this.loadGameSounds();
        await this.loadGameSprites();
    }

    public getSprite(key: string): HTMLImageElement {
        return this._sprites.get(key);
    }

    public getSound(key: string): HTMLAudioElement {
        return this._sounds.get(key).cloneNode(true) as HTMLAudioElement;
    }

    public playSound(key: string, volume: number): void {
        if(GameConfig.soundOn) {
            const sound = this.getSound(key);
            sound.volume = volume;
            sound.play();
        }
    }
}

export const Assets = new Assets_Singleton();
  14 changes: 7 additions & 7 deletions14  