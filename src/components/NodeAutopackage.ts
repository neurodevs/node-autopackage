export default class NodeAutopackage implements Autopackage {
    public static Class?: AutopackageConstructor

    protected constructor() {}

    public static Create() {
        return new (this.Class ?? this)()
    }
}

export interface Autopackage {}

export type AutopackageConstructor = new () => Autopackage
