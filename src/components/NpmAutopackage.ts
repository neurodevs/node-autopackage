import { assertOptions } from '@sprucelabs/schema'

export default class NpmAutopackage implements Autopackage {
    public static Class?: AutopackageConstructor

    protected constructor() {}

    public static async Create(options: AutopackageOptions) {
        assertOptions(options, [
            'name',
            'description',
            'gitNamespace',
            'npmNamespace',
            'installDir',
        ])
        return new (this.Class ?? this)()
    }
}

export interface Autopackage {}

export interface AutopackageOptions {
    name: string
    description: string
    gitNamespace: string
    npmNamespace: string
    installDir: string
}

export type AutopackageConstructor = new () => Autopackage
