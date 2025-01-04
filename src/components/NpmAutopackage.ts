import { execSync } from 'child_process'
import { assertOptions } from '@sprucelabs/schema'

export default class NpmAutopackage implements Autopackage {
    public static Class?: AutopackageConstructor
    public static execSync = execSync

    private packageName: string
    private packageDescription: string
    private installDir: string

    protected constructor(options: AutopackageOptions) {
        const { name, description, installDir } = options

        this.packageName = name
        this.packageDescription = description
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
        this.execSync(this.createModuleCmd, { encoding: 'utf-8' })
    }

    private get execSync() {
        return NpmAutopackage.execSync
    }

    private get createModuleCmd() {
        return `spruce create.module --name "${this.packageName}" --destination "${this.installDir}/${this.packageName}" --description "${this.packageDescription}"`
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
