import useTenant from "./useTenant";
import useProperties from "./useProperties";
import { TenantRandom, PropertyRandom } from "../shared/types"




const useRandomItems = () => {
    function getRandomItems<T> (data: T[], count: number): T[] {
        const shuffled = data.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    const {
        data: tenantData,
        isError: isTenantError,
        isLoading: isTenantLoading
    }: { data: TenantRandom[]; isError: boolean; isLoading: boolean } = useTenant();

    const {
        data: propertyData,
        isError: isPropertyError,
        isLoading: isPropertyLoading
    }: { data: PropertyRandom[]; isError: boolean; isLoading: boolean } = useProperties();

    const isError: boolean = isTenantError || isPropertyError;
    const isLoading: boolean = isTenantLoading || isPropertyLoading;

    const combinedData: Array<TenantRandom | PropertyRandom> = [
        ...(tenantData || []).map((tenant) => ({ ...tenant, category: "tenant" as const })),
        ...(propertyData || []).map((property) => ({ ...property, category: "property" as const }))
    ];

    const randomItems: Array<TenantRandom | PropertyRandom> = getRandomItems(combinedData, 6);

    return { randomItems, isLoading, isError };
};

export default useRandomItems;

