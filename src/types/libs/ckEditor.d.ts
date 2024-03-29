declare module "ckeditor5-custom-build/build/ckeditor" {
  const CustomEditorBuild: {
    create(elementOrData: HTMLElement | string, config?: object): Promise<CustomEditor>;
  };

  export = CustomEditorBuild;
}
