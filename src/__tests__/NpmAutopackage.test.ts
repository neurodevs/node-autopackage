import AbstractSpruceTest, { test, assert } from '@sprucelabs/test-utils'
import NpmAutopackage, { Autopackage } from '../components/NpmAutopackage'

export default class NpmAutopackageTest extends AbstractSpruceTest {
    private static instance: Autopackage

    protected static async beforeEach() {
        await super.beforeEach()
        this.instance = this.NpmAutopackage()
    }

    @test()
    protected static async createsNpmAutopackageInstance() {
        assert.isTruthy(this.instance, 'Should create an instance!')
    }

    private static NpmAutopackage() {
        return NpmAutopackage.Create()
    }
}
