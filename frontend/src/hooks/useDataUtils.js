import useTenant from "./useTenant"
import { PuffLoader } from "react-spinners";
import useProperties from "./useProperties"

const useRandomItems = () => {
    function getRandomItems(data, count) {
        // Shuffle the array
        const shuffled = data.sort(() => 0.5 - Math.random());
        // Return a subset
        return shuffled.slice(0, count);
    }
    
    
    const {
        data: tenantData,
        isError: isTenantError,
        isLoading: isTenantLoading
    } = useTenant()
    
    const {
        data: propertyData,
        isError: isPropertyError,
        isLoading: isPropertyLoading
    } = useProperties()
    
    // if (isTenantError || isPropertyError) {
    //     return (
    //         <div>
    //             <span>Error while fetching data.</span>
    //         </div>
    //     );
    // }

    // if (isTenantLoading || isPropertyLoading) {
    //     return (
    //         <div>
    //             <PuffLoader
    //                 height="80"
    //                 width="80"
    //                 radius={1}
    //                 color="#555"
    //                 aria-label="puff-loading"
    //             />
    //         </div>
    //     );
    // }

    const isError = isTenantError || isPropertyError;
    const isLoading = isTenantLoading || isPropertyLoading;

    const combinedData = [
        ...(tenantData || []).map((tenant)=> ({...tenant, category: "tenant"})),
        ...(propertyData || []).map((property)=> ({...property, category: "property"}))
    ]

    const randomItems = getRandomItems(combinedData, 6)

    return { randomItems, isLoading, isError }
}

export default useRandomItems
