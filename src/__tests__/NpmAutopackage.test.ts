import AbstractSpruceTest, {
    test,
    assert,
    errorAssert,
    generateId,
} from '@sprucelabs/test-utils'
import NpmAutopackage, {
    Autopackage,
    AutopackageOptions,
} from '../components/NpmAutopackage'

export default class NpmAutopackageTest extends AbstractSpruceTest {
    private static instance: Autopackage

    protected static async beforeEach() {
        await super.beforeEach()

        this.fakeExecToPreventActual()
        this.fakeChdirToPreventActual()

        this.instance = await this.NpmAutopackage()
    }

    @test()
    protected static async createsNpmAutopackageInstance() {
        assert.isTruthy(this.instance, 'Should create an instance!')
    }

    @test()
    protected static async throwsWithMissingRequiredOptions() {
        // @ts-ignore
        const err = await assert.doesThrowAsync(() => NpmAutopackage.Create())

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: [
                'name',
                'description',
                'gitNamespace',
                'npmNamespace',
                'installDir',
            ],
        })
    }

    @test()
    protected static async callsChdirToInstallDir() {
        let passedDir = ''

        NpmAutopackage.chdir = (dir: string) => {
            passedDir = dir
        }

        await this.NpmAutopackage()

        assert.isEqual(passedDir, this.installDir, 'Should have changed dir!')
    }

    @test()
    protected static async callsSpruceDotCreateModule() {
        let calledCmd = ''

        // @ts-ignore
        NpmAutopackage.execSync = (cmd: string) => {
            calledCmd = cmd
            return ''
        }

        await this.NpmAutopackage()

        assert.isEqual(
            calledCmd,
            `spruce create.module --name "${this.packageName}" --destination "${this.installDir}/${this.packageName}" --description "${this.packageDescription}"`,
            'Should have called `spruce create.module`!'
        )
    }

    private static fakeExecToPreventActual() {
        // @ts-ignore
        NpmAutopackage.execSync = () => {}
    }

    private static fakeChdirToPreventActual() {
        NpmAutopackage.chdir = () => {}
    }

    private static readonly packageName = generateId()
    private static readonly packageDescription = generateId()
    private static readonly gitNamespace = generateId()
    private static readonly npmNamespace = generateId()
    private static readonly installDir = generateId()

    private static readonly defaultOptions = {
        name: this.packageName,
        description: this.packageDescription,
        gitNamespace: this.gitNamespace,
        npmNamespace: this.npmNamespace,
        installDir: this.installDir,
    }

    private static NpmAutopackage(options?: Partial<AutopackageOptions>) {
        return NpmAutopackage.Create({ ...this.defaultOptions, ...options })
    }
}
