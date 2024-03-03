import { Assets } from "pixi.js"
const COMMON_PATH = './'
let commonResources = {}

function spreadWrappedTextures(resources) {
	for (const {textures} of Object.values(resources))
		if (textures)
			for (const [name, texture] of Object.entries(textures))
				resources[name] = texture

	return resources
}


export async function getPreloadingResources() {
	Assets.addBundle('preloading', {
		loading_background: COMMON_PATH + '/jpg/loading_background.jpg',
		preloading_elements: COMMON_PATH + '/atlases/preloading_elements.json',
		runes:  COMMON_PATH + '/fonts/runes.ttf',
	})

	commonResources = spreadWrappedTextures(
		await Assets.loadBundle('preloading'))

	return commonResources
}

export async function getResources(onProgressCallback) {    
	Assets.addBundle('gameAssets', {
		// ATLASES...
		symbols: COMMON_PATH + '/atlases/symbols.json',
		reels_elements: COMMON_PATH + '/atlases/reels_elements.json',
		teaser_elements: COMMON_PATH + '/atlases/teaser_elements.json',
		elements: COMMON_PATH + '/atlases/elements.json',
		// ...ATLASES

		// JPG...
		background_tile: COMMON_PATH + '/jpg/background_tile.jpg',
		// ...JPG
	})

	const resources = spreadWrappedTextures(
		await Assets.loadBundle('gameAssets', onProgressCallback))

	return {...commonResources, ...resources}
}
