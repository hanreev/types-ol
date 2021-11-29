declare const env: any;

interface DefinitionConfig {
    extraOptions?: boolean;
    mode?: 'single' | 'multiple';
    strictGenericTypes?: boolean;
    strictReturnTypes?: boolean;
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

type DocletKind = 'function' | 'class' | 'member' | 'method' | 'typedef' | 'enum' | 'constant' | 'module' | 'event';

interface DocletType {
    names: string[];
}

interface DocletProp {
    name: string;
    description?: string;
    kind?: DocletKind;
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

interface DocletGenericType {
    name: string;
    type?: DocletType;
}

interface Doclet {
    ___id: string;
    _hideConstructor?: boolean;
    access?: string;
    augments?: string[];
    classdesc?: string;
    comment?: string;
    description?: string;
    exports?: ModuleExports;
    fires?: string[];
    force_include_members?: string[];
    genericTypes?: DocletGenericType[];
    ignore?: boolean;
    inheritdoc?: boolean;
    inherited?: boolean;
    inherits?: string;
    isEnum?: boolean;
    kind: DocletKind;
    longname: string;
    memberof?: string;
    meta?: DocletMeta;
    name: string;
    observable?: string;
    observables?: any[];
    overrides?: string;
    params?: DocletParam[];
    properties?: DocletProp[];
    returns?: DocletReturns[];
    scope?: string;
    setMemberof(parent: string): void;
    stability?: string;
    tags?: any[];
    type?: DocletType;
    undocumented?: boolean;
    virtual?: boolean;
    yields?: DocletReturns[];
    imports?: Record<string, string[]>;
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

interface TagValue {
    type?: DocletType;
    description?: string;
}

interface Tag<T = TagValue> {
    originalTitle: string;
    title: string;
    text: string;
    value: T;
}

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

interface CommentFoundEvent {
    filename: string;
    comment: string;
    lineno: number;
    columnno: number;
}
