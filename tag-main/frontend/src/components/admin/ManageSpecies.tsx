import {useState, useEffect} from "react";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {Search, Plus, Eye, Pencil, Trash2, ChevronLeft, ChevronRight, X} from "lucide-react";
import AddSpeciesModal from "./AddSpeciesModal";
import {speciesApi} from "@/api/modules/species";
import {toast} from "@/components/ui/use-toast";
import EditSpeciesModal from "./EditSpeciesModal";
import {useDebounce} from "@/hooks/useDebounce";
import CircularLoader from "../ui/CircularLoader";

const ManageSpecies = () => {
    const queryClient = useQueryClient();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedSpecies, setSelectedSpecies] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [waterTypeFilter, setWaterTypeFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all"); // Added Category Filter
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<{id: string; name: string; category: string} | null>(null);

    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const {
        data: speciesData,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["species-admin", currentPage, debouncedSearchQuery, waterTypeFilter, statusFilter, categoryFilter],
        queryFn: () => speciesApi.searchSpeciesManagement({
            query: debouncedSearchQuery,
            waterType: waterTypeFilter !== "all" ? waterTypeFilter : undefined,
            status: statusFilter !== "all" ? statusFilter : undefined,
            category: categoryFilter !== "all" ? categoryFilter : undefined,
            page: currentPage,
            limit: 20,
        }),
        staleTime: 1000 * 60,
    });

    useEffect(() => { setCurrentPage(1); }, [debouncedSearchQuery, waterTypeFilter, statusFilter, categoryFilter]);

    const deleteMutation = useMutation({
        mutationFn: ({id, category}: {id: string, category: string}) => 
            speciesApi.deleteSpecies(id, category),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["species-admin"]});
            toast({description: "Entry deleted successfully"});
        },
        onError: (err: any) => toast({description: err.message || "Delete failed", variant: "destructive"}),
    });

    const species = speciesData?.data.species || [];
    const totalPages = speciesData?.data.totalPages || 1;
    const total = speciesData?.data.total || 0;

    const handleDeleteClick = (id: string, name: string, category: string) => {
        setItemToDelete({id, name, category});
        setDeleteConfirmOpen(true);
    };

    const confirmDelete = () => {
        if (itemToDelete) {
            deleteMutation.mutate({id: itemToDelete.id, category: itemToDelete.category});
            setDeleteConfirmOpen(false);
        }
    };

    const getCategoryBadge = (cat: string) => {
        const isFish = cat === 'fish';
        return (
            <Badge className={isFish ? "bg-blue-500/20 text-blue-400 border-blue-500/30" : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"}>
                {isFish ? "Fish" : "Plant"}
            </Badge>
        );
    };

    if (isError) return <div className="p-10 text-center text-red-500">Error: {(error as any).message}</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Manage Dictionary</h2>
                <Button onClick={() => setIsAddModalOpen(true)} className="bg-primary">
                    <Plus className="w-4 h-4 mr-2" /> Add Entry
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative md:col-span-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="fish">Fish</SelectItem>
                        <SelectItem value="aquaticplants">Plants</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={waterTypeFilter} onValueChange={setWaterTypeFilter}>
                    <SelectTrigger><SelectValue placeholder="Water Type" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Waters</SelectItem>
                        <SelectItem value="freshwater">Freshwater</SelectItem>
                        <SelectItem value="marine">Marine</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {isLoading ? <CircularLoader /> : (
                <div className="rounded-lg border border-border overflow-hidden bg-card shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50">
                                <TableHead className="w-16">Image</TableHead>
                                <TableHead>Species Info</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {species.map((spec: any) => (
                                <TableRow key={`${spec.category}-${spec.id}`} className="hover:bg-muted/30 border-border">
                                    <TableCell>
                                        <img src={spec.primary_image || "/placeholder.svg"} className="w-10 h-10 rounded object-cover border border-border" />
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{spec.common_name}</div>
                                        <div className="text-xs italic text-muted-foreground">{spec.scientific_name}</div>
                                    </TableCell>
                                    <TableCell>{getCategoryBadge(spec.category)}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={spec.status === 'published' ? "text-green-500" : "text-yellow-500"}>
                                            {spec.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-1">
                                            <Button size="icon" variant="ghost" onClick={() => setSelectedSpecies(spec) || setIsEditModalOpen(true)}>
                                                <Pencil className="w-4 h-4 text-yellow-500" />
                                            </Button>
                                            <Button size="icon" variant="ghost" onClick={() => handleDeleteClick(spec.id, spec.common_name, spec.category)}>
                                                <Trash2 className="w-4 h-4 text-red-500" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            {/* Pagination and Dialogs */}
            <div className="flex justify-between items-center py-4">
                <p className="text-xs text-muted-foreground">Total: {total} entries</p>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}><ChevronLeft /></Button>
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage >= totalPages}><ChevronRight /></Button>
                </div>
            </div>

            <AddSpeciesModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
            <EditSpeciesModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} species={selectedSpecies} />
            
            <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Permanent Deletion</AlertDialogTitle>
                        <AlertDialogDescription>
                            Confirm deletion of <span className="font-bold">"{itemToDelete?.name}"</span>?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-white">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ManageSpecies;
