from rest_framework.permissions import BasePermission

class IsAdministradorOrIngeniero(BasePermission):
    """
    Permiso personalizado que permite acceso solo a administradores e ingenieros
    """
    
    def has_permission(self, request, view):
        # Verificar que el usuario esté autenticado
        print("=== DEBUG PERMISSION ===")
        print(f"Usuario: {request.user}")
        print(f"Is authenticated: {request.user.is_authenticated}")
        print(f"Headers: {request.headers}")
        print(f"Auth header: {request.headers.get('Authorization', 'No Authorization header')}")
        
        if not request.user or not request.user.is_authenticated:
            print("Usuario no autenticado")
            return False
        
        print(f"Rol del usuario: {request.user.rol}")
        # Verificar que tenga el rol correcto
        return request.user.rol in ['Administrador', 'Ingeniero']

class IsAdministrador(BasePermission):
    """
    Permiso personalizado que permite acceso solo a administradores
    """
    
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        
        return request.user.rol == 'Administrador'

class IsIngeniero(BasePermission):
    """
    Permiso personalizado que permite acceso solo a ingenieros
    """
    
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        
        return request.user.rol == 'Ingeniero'

class IsTecnico(BasePermission):
    """
    Permiso personalizado que permite acceso solo a técnicos
    """
    
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False

        return request.user.rol == 'Tecnico'

class IsSupervisorCliente(BasePermission):
    """
    Permiso personalizado que permite acceso solo a supervisores de cliente
    """
    
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False

        return request.user.rol == 'Supervisor_Cliente'
