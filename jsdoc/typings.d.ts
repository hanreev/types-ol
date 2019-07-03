declare var env: any;

interface DeclarationConfig {
    mode?: 'single' | 'multiple';
    strictGenericTypes?: boolean;
}

interface ModuleImports {
    names: string[];
    imported: { [key: string]: string };
    expressions: string[];
}

interface ModuleExports {
    exports: string[];
    reExports: string[];
    default?: string;
}

interface DocletType {
    names: string[];
}

interface DocletProp {
    name: string;
    description?: string;
    kind?: string;
    memberof?: string;
    type?: DocletType;
    optional?: boolean;
    defaultvalue?: any;
}

interface DocletParam {
    name: string;
    description?: string;
    type?: DocletType;
    optional?: boolean;
    variable?: boolean;
    defaultValue?: any;
}

interface DocletReturns {
    name?: string;
    description?: string;
    type?: DocletType;
}

interface DocletMetaCode {
    id: string;
    name: string;
    type: string;
    paramnames?: string[];
    value?: string;
}

interface DocletMeta {
    code: DocletMetaCode;
    columnno: number;
    filename: string;
    lineno: number;
    path: string;
    range?: number[];
    vars?: {
        [x: string]: any;
    };
}

interface Doclet {
    ___id: string;
    kind: string;
    longname: string;
    name: string;
    access?: string;
    augments?: string[];
    classdesc?: string;
    comment?: string;
    description?: string;
    exports?: ModuleExports;
    fires?: string[];
    force_include_members?: string[];
    inheritDoc?: boolean;
    inherited?: boolean;
    isEnum?: boolean;
    memberof?: string;
    meta?: DocletMeta;
    observables?: any[];
    overrides?: string;
    params?: DocletParam[];
    properties?: DocletProp[];
    returns?: DocletReturns[];
    scope?: string;
    stability?: string;
    tags?: any[];
    type?: DocletType;
    undocumented?: boolean;
    yields?: DocletReturns[];
    _hideConstructor?: boolean;
    setMemberof: (parent: string) => void;
}

interface TypeLiteral {
    type: string;
    optional?: boolean;
}

interface TypeNameExpression {
    name: string;
    type: 'NameExpression';
    optional?: boolean;
    reservedWord?: boolean;
}

interface TypeFunction {
    type: 'FunctionType';
    params: ParsedType[];
    this?: ParsedType;
    result?: ParsedType;
    optional?: boolean;
}

interface TypeApplication {
    type: 'TypeApplication';
    expression: TypeNameExpression;
    applications: ParsedType[];
    optional?: boolean;
}

interface TypeUnion {
    type: 'TypeUnion';
    elements?: ParsedType[];
    optional?: boolean;
}

type ParsedType = TypeLiteral | TypeApplication | TypeNameExpression | TypeFunction | TypeUnion;

type DocletParser = (p0: Doclet, p1: Doclet) => string;

// JSDoc

interface BeforeParseEvent {
    filename: string;
    source: string;
}

interface ParseCompleteEvent {
    sourcefiles: string[];
    doclets: Doclet[];
}

interface NewDocletEvent {
    doclet: Doclet;
}
