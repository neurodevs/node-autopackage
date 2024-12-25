import AbstractSpruceTest, { test, assert } from '@sprucelabs/test-utils'
import NodeAutopackage, { Autopackage } from '../components/NodeAutopackage'

export default class NodeAutopackageTest extends AbstractSpruceTest {
    private static instance: Autopackage

    protected static async beforeEach() {
        await super.beforeEach()
        this.instance = this.NodeAutopackage()
    }

    @test()
    protected static async canCreateNodeAutopackage() {
        assert.isTruthy(this.instance, 'Should create an instance!')
    }

    private static NodeAutopackage() {
        return NodeAutopackage.Create()
    }
}
