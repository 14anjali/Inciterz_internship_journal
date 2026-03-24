import type { 
    SpeciesFormData, 
    AddSpeciesResponse, 
    GetSpeciesManagementResponse, 
    SearchSpeciesParams, 
    GetSpeciesDetailResponse 
} from '@/api/apiTypes';

import httpClient from '@/api/axiosSetup';

export const speciesApi = {
    // Dynamically routes to Fish or Plant endpoint based on category
    addSpecies: (data: SpeciesFormData) => {
        const endpoint = data.category === 'fish' 
            ? '/manage_species/species-management/new' 
            : '/manage_species/aquatic-plants/new';
            
        return httpClient.post<AddSpeciesResponse>(endpoint, data, {
            headers: { useAuth: true },
        });
    },

    uploadImage: (file: File) => {
        const formData = new FormData();
        formData.append("image", file);
        return httpClient.post<{ message: string; imageUrl: string }>('/manage_species/species-management/upload-image', formData, {
            headers: { 
                useAuth: true,
            },
        });
    },

    getSpeciesManagement: (page: number = 1) =>
        httpClient.get<GetSpeciesManagementResponse>(`/manage_species/species-management?page=${page}`, {
            headers: { useAuth: true },
        }),

    getSpeciesById: (speciesId: string) =>
        httpClient.get<GetSpeciesDetailResponse>(`/species/${speciesId}`, { 
            headers: { useAuth: false },
        }),

    getCompatibilityOptions: () =>
        httpClient.get('/species/compatibility-options'),

    // Dynamically routes update to correct table
    updateSpecies: (speciesId: string, data: SpeciesFormData) => {
        const endpoint = data.category === 'fish' 
            ? `/manage_species/species-management/${speciesId}` 
            : `/manage_species/aquatic-plants/${speciesId}`;

        return httpClient.put<AddSpeciesResponse>(endpoint, data, {
            headers: { useAuth: true },
        });
    },

    // Note: If your backend uses the same delete logic for both, 
    // you might need to pass the category here too.
    deleteSpecies: (speciesId: string, category: string = 'fish') => {
        const endpoint = category === 'fish'
            ? `/manage_species/species-management/${speciesId}`
            : `/manage_species/aquatic-plants/${speciesId}`;

        return httpClient.delete<{ message: string }>(endpoint, {
            headers: { useAuth: true },
        });
    },

    searchSpeciesManagement: (params: SearchSpeciesParams) => {
        const queryParams = new URLSearchParams();
        if (params.query) queryParams.append('q', params.query);
        if (params.waterType) queryParams.append('type', params.waterType);
        if (params.status) queryParams.append('status', params.status);
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.category) queryParams.append('category', params.category);

        return httpClient.get<GetSpeciesManagementResponse>(`/manage_species/species/search?${queryParams.toString()}`, {
            headers: { useAuth: true },
        });
    },

    searchSpecies: (params: SearchSpeciesParams) => {
        const queryParams = new URLSearchParams();
        if (params.query) queryParams.append('q', params.query);
        if (params.waterType) queryParams.append('water_type', params.waterType);
        if (params.careLevel) queryParams.append('care_level', params.careLevel);
        if (params.category) queryParams.append('category', params.category);
        if (params.status) queryParams.append('status', params.status);
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());

        return httpClient.get<GetSpeciesManagementResponse>(`/species-dictionary?${queryParams.toString()}`, {
            headers: { useAuth: false },
        });
    },
};
