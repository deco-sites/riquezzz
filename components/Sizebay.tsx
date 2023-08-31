export interface Props {
  /**
   * @description Sizebay Tenant ID. 
   */
  tenantId: string;
}

export default function Sizebay(
  { tenantId }: Props,
) {
  return (
    <>
        <script
            defer
            id="sizebay-vfr-v4"
            src={`https://static.sizebay.technology/${tenantId}/prescript.js`}>
        </script>
    </>
  );
}
