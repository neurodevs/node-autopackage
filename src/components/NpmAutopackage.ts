export default class NpmAutopackage implements Autopackage {
    public static Class?: AutopackageConstructor

    protected constructor() {}

    public static async Create() {
        return new (this.Class ?? this)()
    }
}

export interface Autopackage {}

export interface AutopackageOptions {}

export type AutopackageConstructor = new () => Autopackage
