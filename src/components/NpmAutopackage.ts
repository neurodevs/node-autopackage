import { exec } from 'child_process'
import { assertOptions } from '@sprucelabs/schema'

export default class NpmAutopackage implements Autopackage {
    public static Class?: AutopackageConstructor
    public static exec = exec

    private installDir: string

    protected constructor(options: AutopackageOptions) {
        const { installDir } = options

        this.installDir = installDir
    }

    public static async Create(options: AutopackageOptions) {
        this.assertOptions(options)

        const instance = new (this.Class ?? this)(options)
        await instance.createPackage()

        return instance
    }

    public async createPackage() {
        this.executeCreateModule()
    }

    private executeCreateModule() {
        this.exec(this.createModuleCmd)
    }

    private get exec() {
        return NpmAutopackage.exec
    }

    private get createModuleCmd() {
        return `spruce create.module --destination ${this.installDir}`
    }

    private static assertOptions(options: AutopackageOptions) {
        assertOptions(options, [
            'name',
            'description',
            'gitNamespace',
            'npmNamespace',
            'installDir',
        ])
    }
}

export interface Autopackage {
    createPackage(): Promise<void>
}

export interface AutopackageOptions {
    name: string
    description: string
    gitNamespace: string
    npmNamespace: string
    installDir: string
}

export type AutopackageConstructor = new () => Autopackage
