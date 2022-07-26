import { render, screen, fireEvent } from "@testing-library/react";
import { AuthContext } from "../../../src/auth/context/AuthContext";
import { MemoryRouter, useNavigate } from 'react-router-dom'
import { Navbar } from "../../../src/ui";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}));

describe('Pruebas en Navbar', () => { 

    const contextValue = {
        logged: true,
        user:{
            name: 'Pablo'
        },
        logout: jest.fn()
    }

    beforeEach(() => jest.clearAllMocks());
    
    test('debe de mostrar el nombre del usuario', () => { 
        
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar></Navbar>
                </MemoryRouter>
            </AuthContext.Provider> 
        )

        expect(screen.getByText('Pablo')).toBeTruthy();

    });

    test('debe de llamar el logout y navigate cuando se hace click en el botón', () => { 
    
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar></Navbar>
                </MemoryRouter>
            </AuthContext.Provider> 
        )

        const logoutBtn = screen.getByRole('button');
        fireEvent.click(logoutBtn);

        expect(contextValue.logout).toHaveBeenCalled();
        expect(mockedUseNavigate).toHaveBeenCalledWith("/login", {"replace": true});

    });

 })