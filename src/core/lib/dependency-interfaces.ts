export interface IModalElement extends JQuery<HTMLElement> {
  modal: (action?: string | { backdrop?: "static" }) => void;
}

export interface IMediumInsertPlugin extends JQuery<HTMLElement> {
  mediumInsert: (options: {
    addons: {
      embeds: boolean;
      images: {
        autoGrid: number;
        captionPlaceholder: string;
        captions: boolean;
        deleteMethod: string | Function | null;
        deleteScript: string | Function | null;
        fileDeleteOptions: any;
        formData: any;
        label: string;
        uploadScript: string | Function | null;
        preview: boolean;
        fileUploadOptions: {
          url: string;
          acceptFileTypes: RegExp;
          headers: any;
        },
        actions: {
          remove: {
            label: string;
            clicked: (el: JQuery<HTMLElement>) => void;
          },
        },
        messages: {
          acceptFileTypesError: string;
          maxFileSizeError: string;
        },
        uploadCompleted: (el: JQuery<HTMLElement>, data: any) => void;
        uploadFailed: (el: JQuery<HTMLElement>, data: any) => void;
      },
    },
    editor?: any;
  }) => void;
}

export interface ITagIt extends JQuery<HTMLElement> {
  tagit: (
      options: {
        tagLimit: number;
        afterTagAdded: (event: Event, ui: any) => void;
      } | "createTag",
      hashtag?: string) => void;
}
