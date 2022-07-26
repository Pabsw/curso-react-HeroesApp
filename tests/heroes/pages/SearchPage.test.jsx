import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom'
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}));

describe('Pruebas en SearchPage', () => { 

    beforeEach(() => jest.clearAllMocks());
   
    test('debe de mostrarse correctamente con valores por defecto', () => { 
        
        const {container} = render(
            <MemoryRouter>
                <SearchPage></SearchPage>
            </MemoryRouter>
        );
        expect(container).toMatchSnapshot();
     });
   
    test('debe de mostrar a Batman y el input con el valor del queryString', () => { 
        
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage></SearchPage>
            </MemoryRouter>
        );
    
        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman');

        const img = screen.getByRole('img');
        expect(img.src).toContain('/assets/heroes/dc-batman.jpg');

        const alert = screen.getByLabelText('alert-danger');
        expect(alert.style.display).toBe('none');
    });

    test('debe de mostrar un error si no se encuentra el hero (batman123)', () => { 
        
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage></SearchPage>
            </MemoryRouter>
        );

        const alert = screen.getByLabelText('alert-danger');
        expect(alert.style.display).toBe('');

    });

    test('debe de llamar el navigate a la pantalla nueva', () => { 
        
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage></SearchPage>
            </MemoryRouter>
        );
        
        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {name: 'searchText', value: 'superman'}});

        const form = screen.getByRole('form');
        fireEvent.submit(form);

        expect(mockedUseNavigate).toHaveBeenCalledWith('?q=superman');
    });

});