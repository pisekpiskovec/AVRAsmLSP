export type DocumentUri = string;
type DocumentBody = string;

export interface TextDocumentIdentifier {
	uri: string;
}

export interface VersionedTextDocumentIdentifier extends TextDocumentIdentifier {
	version: number;
}

export interface TextDocumentContentChangeEvent{
	text: string;
}
 
export const documents = new Map<DocumentUri, DocumentBody>();
