/**
 * Holds all the information for a rendering component that will be used to render specific patterns languages and
 * patterns.
 */
export default interface RenderingComponent {
  /**
   * The priority of the specified renderer. Higher priority leads to lower index in list of all renderer for the given
   * identifier.
   */
  priority?: number;
  /**
   * The label of the renderer used for displaying.
   */
  label?: string;
  /**
   * The component for the patterns language.
   */
  plcomponent: any;
  /**
   * The component for the patterns.
   */
  pcomponent: any;
}
